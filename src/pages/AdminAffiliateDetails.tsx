
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { LogOut, ChevronLeft } from 'lucide-react';
import MyntraLogo from '@/components/MyntraLogo';
import AffiliateDetailsHeader from '@/components/admin/AffiliateDetailsHeader';
import AffiliateKycTab from '@/components/admin/AffiliateKycTab';
import AffiliatePaymentsTab from '@/components/admin/AffiliatePaymentsTab';
import AffiliateInvoicesTab from '@/components/admin/AffiliateInvoicesTab';

const AdminAffiliateDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('kyc');

  // Mock data for the affiliate - removed email and pending payout
  const affiliate = {
    id: id || 'MYNTRA123',
    name: 'John Doe',
    phone: '+91 9876543210',
    kycStatus: 'Pending',
    netPayout: '₹47,800',
    lastUpdated: '15 May, 2025',
    kycDetails: {
      idType: 'PAN',
      idValue: 'ABCDE1234F',
      idDocument: 'pan_card.jpg',
      accountNumber: '1234567890',
      ifsc: 'SBIN0001234',
      accountName: 'John Doe',
      bankName: 'State Bank of India',
      accountType: 'Savings',
      bankDocument: 'bank_statement.pdf'
    },
    currentPayment: {
      amount: '₹12,500',
      date: '15 May, 2025',
      breakdown: [
        { label: 'Base Amount', value: '₹12,500.00' },
        { label: 'TDS (10%)', value: '-₹1,250.00' },
        { label: 'Net Payable', value: '₹11,250.00' }
      ],
      status: 'Pending'
    },
    invoices: [
      { id: 'INV001', date: '15 May, 2025', amount: '₹2,500', status: 'Paid' },
      { id: 'INV002', date: '12 May, 2025', amount: '₹1,800', status: 'Processing' },
      { id: 'INV003', date: '10 May, 2025', amount: '₹8,200', status: 'Paid' },
      { id: 'INV004', date: '8 May, 2025', amount: '₹3,400', status: 'Paid' },
      { id: 'INV005', date: '5 May, 2025', amount: '₹9,600', status: 'Paid' },
      { id: 'INV006', date: '3 May, 2025', amount: '₹2,100', status: 'Processing' },
      { id: 'INV007', date: '1 May, 2025', amount: '₹4,700', status: 'Paid' },
      { id: 'INV008', date: '28 Apr, 2025', amount: '₹12,500', status: 'Processing' },
      { id: 'INV009', date: '26 Apr, 2025', amount: '₹3,800', status: 'Paid' },
      { id: 'INV010', date: '24 Apr, 2025', amount: '₹6,200', status: 'Paid' },
      { id: 'INV011', date: '22 Apr, 2025', amount: '₹1,900', status: 'Processing' },
      { id: 'INV012', date: '20 Apr, 2025', amount: '₹5,300', status: 'Paid' },
      { id: 'INV013', date: '18 Apr, 2025', amount: '₹7,600', status: 'Paid' },
      { id: 'INV014', date: '15 Apr, 2025', amount: '₹17,500', status: 'Paid' },
      { id: 'INV015', date: '13 Apr, 2025', amount: '₹2,800', status: 'Processing' },
      { id: 'INV016', date: '11 Apr, 2025', amount: '₹4,100', status: 'Paid' },
      { id: 'INV017', date: '9 Apr, 2025', amount: '₹6,700', status: 'Paid' },
      { id: 'INV018', date: '7 Apr, 2025', amount: '₹3,200', status: 'Processing' }
    ]
  };

  const handleVerifyKyc = (isApproved: boolean) => {
    toast({
      title: isApproved ? "KYC Approved" : "KYC Rejected",
      description: isApproved
        ? `KYC for affiliate ${affiliate.id} has been approved.`
        : `KYC for affiliate ${affiliate.id} has been rejected.`,
    });
  };

  const handleProcessPayment = () => {
    toast({
      title: "Payment Processed",
      description: `Payment of ${affiliate.currentPayment.amount} for affiliate ${affiliate.id} has been initiated.`,
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoiceId} has been downloaded.`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const handleBackToList = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <MyntraLogo className="h-8 w-auto mr-3" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-red-600 self-end sm:self-auto"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Button 
          variant="ghost" 
          onClick={handleBackToList}
          className="flex items-center mb-4 sm:mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Affiliates List
        </Button>
        
        <AffiliateDetailsHeader affiliate={affiliate} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6 sm:mt-8">
          <TabsList className="bg-white shadow-sm rounded-md w-full sm:w-auto grid grid-cols-3 sm:flex">
            <TabsTrigger value="kyc" className="text-xs sm:text-sm">KYC Details</TabsTrigger>
            <TabsTrigger value="payments" className="text-xs sm:text-sm">Payment Details</TabsTrigger>
            <TabsTrigger value="invoices" className="text-xs sm:text-sm">Invoices</TabsTrigger>
          </TabsList>
          
          {/* KYC Details Tab */}
          <TabsContent value="kyc">
            <AffiliateKycTab 
              kycDetails={affiliate.kycDetails} 
              kycStatus={affiliate.kycStatus}
              onVerify={handleVerifyKyc} 
            />
          </TabsContent>
          
          {/* Payments Tab */}
          <TabsContent value="payments">
            <AffiliatePaymentsTab 
              currentPayment={affiliate.currentPayment}
              onProcessPayment={handleProcessPayment}
            />
          </TabsContent>
          
          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <AffiliateInvoicesTab 
              invoices={affiliate.invoices}
              onDownloadInvoice={handleDownloadInvoice}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminAffiliateDetails;
