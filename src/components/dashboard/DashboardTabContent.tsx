
import React from 'react';
import { Card } from '@/components/ui/card';
import KycStatusCard from './KycStatusCard';
import PayoutCard from './PayoutCard';
import RecentInvoicesCard from './RecentInvoicesCard';

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: string;
  referenceNumber?: string | null;
};

type DashboardTabContentProps = {
  kycStatus: {
    status: string;
    date: string;
    requestDate: string;
  };
  payoutInfo: {
    netPayout: string;
    lastPayout: string;
    lastPayoutDate: string;
  };
  invoices: Invoice[];
  onViewAllInvoices: () => void;
  onDownloadInvoice: (invoiceId: string) => void;
};

const DashboardTabContent = ({ 
  kycStatus, 
  payoutInfo, 
  invoices, 
  onViewAllInvoices, 
  onDownloadInvoice 
}: DashboardTabContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KycStatusCard 
          status={kycStatus.status}
          date={kycStatus.date}
          requestDate={kycStatus.requestDate}
        />
        
        <PayoutCard
          amount={payoutInfo.netPayout}
          subtext={`Last payout: ${payoutInfo.lastPayout} on ${payoutInfo.lastPayoutDate}`}
        />
      </div>
      
      <RecentInvoicesCard
        invoices={invoices}
        onViewAll={onViewAllInvoices}
        onDownload={onDownloadInvoice}
      />
    </div>
  );
};

export default DashboardTabContent;
