import React, { useState, useEffect } from 'react';
import { 
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard,
  CheckCircle,
  XCircle,
  Loader2,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { getRegistrations, updateRegistrationStatus, deleteRegistration } from '../../firebase/registrations';
import { format } from 'date-fns';
import type { RegistrationData } from '../../types/registration';
import { Invoice } from '../Invoice';

export function BookingManagement() {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [actionLoading, setActionLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRegistrations();
  }, []);

  async function loadRegistrations() {
    try {
      const data = await getRegistrations();
      setRegistrations(data);
    } catch (error) {
      console.error('Error loading registrations:', error);
      setError('Failed to load registrations');
    } finally {
      setLoading(false);
    }
  }

  const handleStatusUpdate = async (registrationId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      setActionLoading(true);
      setError(null);
      await updateRegistrationStatus(registrationId, newStatus);
      await loadRegistrations();
      setIsDetailsOpen(false);
    } catch (error) {
      console.error('Error updating registration status:', error);
      setError('Failed to update registration status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteRegistration = async (registrationId: string) => {
    try {
      setActionLoading(true);
      setError(null);
      await deleteRegistration(registrationId);
      await loadRegistrations();
      setShowDeleteConfirm(false);
      setRegistrationToDelete(null);
    } catch (error) {
      console.error('Error deleting registration:', error);
      setError('Failed to delete registration');
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDelete = (registrationId: string) => {
    setRegistrationToDelete(registrationId);
    setShowDeleteConfirm(true);
  };

  const filteredRegistrations = activeTab === "all" 
    ? registrations
    : registrations.filter(reg => reg.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Booking Management
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              View and manage course registrations
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={activeTab} className="w-full md:w-max">
            <TabsHeader>
              <Tab value="all" onClick={() => setActiveTab("all")}>
                All
              </Tab>
              <Tab value="pending" onClick={() => setActiveTab("pending")}>
                Pending
              </Tab>
              <Tab value="confirmed" onClick={() => setActiveTab("confirmed")}>
                Confirmed
              </Tab>
              <Tab value="cancelled" onClick={() => setActiveTab("cancelled")}>
                Cancelled
              </Tab>
            </TabsHeader>
          </Tabs>
        </div>
      </CardHeader>
      <CardBody className="px-0">
        {error && (
          <div className="mx-4 mb-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <div className="grid gap-4">
          {filteredRegistrations.map((registration) => (
            <div
              key={registration.id}
              className="mx-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">
                      {registration.studentInfo.firstName} {registration.studentInfo.lastName}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getStatusColor(registration.status)}`}>
                      {registration.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(registration.createdAt.seconds * 1000), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4" />
                      <span className={getPaymentStatusColor(registration.payment.status)}>
                        {registration.payment.status}
                      </span>
                    </div>
                  </div>
                  {registration.courseInfo && (
                    <div className="text-sm text-gray-600">
                      Course: {registration.courseInfo.courseName}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outlined"
                    size="sm"
                    onClick={() => {
                      setSelectedRegistration(registration);
                      setIsDetailsOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="red"
                    size="sm"
                    onClick={() => confirmDelete(registration.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filteredRegistrations.length === 0 && (
            <div className="mx-4 p-6 text-center text-gray-500">
              No registrations found
            </div>
          )}
        </div>
      </CardBody>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} handler={() => setShowDeleteConfirm(false)}>
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody divider className="flex items-center gap-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <Typography>
            Are you sure you want to delete this registration? This action cannot be undone.
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => registrationToDelete && handleDeleteRegistration(registrationToDelete)}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Delete Registration'
            )}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Registration Details Dialog */}
      <Dialog
        open={isDetailsOpen}
        handler={() => {
          setIsDetailsOpen(false);
          setSelectedRegistration(null);
        }}
        size="xl"
      >
        <div>
          {selectedRegistration ? (
            <>
              <DialogHeader>Registration Details</DialogHeader>
              <DialogBody divider>
                <Tabs value="details">
                  <TabsHeader>
                    <Tab value="details">Details</Tab>
                    <Tab value="invoice">Invoice</Tab>
                  </TabsHeader>
                  <TabsBody>
                    <TabPanel value="details">
                      <div className="grid gap-4">
                        {/* Student Information */}
                        <div className="space-y-2">
                          <Typography variant="h6" color="blue-gray">
                            Student Information
                          </Typography>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-blue-500" />
                              <span>
                                {selectedRegistration.studentInfo.firstName} {selectedRegistration.studentInfo.lastName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-blue-500" />
                              <span>{selectedRegistration.studentInfo.email}</span>
                            </div>
                          </div>
                        </div>

                        {/* Parent Information */}
                        <div className="space-y-2">
                          <Typography variant="h6" color="blue-gray">
                            Parent Information
                          </Typography>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-blue-500" />
                              <span>
                                {selectedRegistration.parentInfo.firstName} {selectedRegistration.parentInfo.lastName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-blue-500" />
                              <span>{selectedRegistration.parentInfo.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-blue-500" />
                              <span>{selectedRegistration.parentInfo.phone}</span>
                            </div>
                            {selectedRegistration.parentInfo.address && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-500" />
                                <span>
                                  {selectedRegistration.parentInfo.address.street}, {selectedRegistration.parentInfo.address.city}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Course Information */}
                        {selectedRegistration.courseInfo && (
                          <div className="space-y-2">
                            <Typography variant="h6" color="blue-gray">
                              Course Information
                            </Typography>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="font-medium">Course:</span> {selectedRegistration.courseInfo.courseName}
                              </div>
                              <div>
                                <span className="font-medium">Session Date:</span> {selectedRegistration.courseInfo.date}
                              </div>
                              <div>
                                <span className="font-medium">Session Time:</span> {selectedRegistration.courseInfo.time}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Payment Information */}
                        <div className="space-y-2">
                          <Typography variant="h6" color="blue-gray">
                            Payment Information
                          </Typography>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="font-medium">Method:</span> {selectedRegistration.payment.method}
                            </div>
                            <div>
                              <span className="font-medium">Amount:</span> €{selectedRegistration.payment.amount}
                            </div>
                            <div>
                              <span className="font-medium">Status:</span>{' '}
                              <span className={getPaymentStatusColor(selectedRegistration.payment.status)}>
                                {selectedRegistration.payment.status}
                              </span>
                            </div>
                            {selectedRegistration.payment.transactionId && (
                              <div>
                                <span className="font-medium">Transaction ID:</span> {selectedRegistration.payment.transactionId}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="invoice">
                      <Invoice registration={selectedRegistration} />
                    </TabPanel>
                  </TabsBody>
                </Tabs>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button
                  variant="outlined"
                  color="red"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    setSelectedRegistration(null);
                  }}
                >
                  Close
                </Button>
                {selectedRegistration.status === 'pending' && (
                  <>
                    <Button
                      variant="filled"
                      color="green"
                      onClick={() => handleStatusUpdate(selectedRegistration.id, 'confirmed')}
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirm
                        </>
                      )}
                    </Button>
                    <Button
                      variant="filled"
                      color="red"
                      onClick={() => handleStatusUpdate(selectedRegistration.id, 'cancelled')}
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel
                        </>
                      )}
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          ) : (
            <div className="p-6">
              <Typography>Loading registration details...</Typography>
            </div>
          )}
        </div>
      </Dialog>
    </Card>
  );
}