
import React from 'react';
import { Button } from '@/components/ui/button';

interface RegroupingModalProps {
  isOpen: boolean;
  onRegroup: () => void;
  onCancel: () => void;
}

const RegroupingModal: React.FC<RegroupingModalProps> = ({ 
  isOpen, 
  onRegroup, 
  onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-grade-card p-8 max-w-md mx-4 shadow-grade-card animate-scale-in"
           style={{
             borderLeft: '10px solid #6F00FF',
             borderBottom: '10px solid #6F00FF'
           }}>
        <div className="text-center">
          <div className="font-space-grotesk text-2xl font-bold mb-4 text-grade-purple">
            🔄 Ready to Regroup!
          </div>
          <div className="font-dm-sans text-grade-body-lg text-grade-black mb-6">
            You have 10 ones! Would you like to move them to make 1 ten?
          </div>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={onRegroup}
              className="font-dm-sans text-grade-button font-bold bg-grade-blue hover:bg-grade-blue/90 text-white px-6 py-3 rounded-grade-pill"
            >
              Yes, Regroup!
            </Button>
            <Button 
              onClick={onCancel}
              variant="outline"
              className="font-dm-sans text-grade-button font-bold border-grade-black text-grade-black hover:bg-grade-gray px-6 py-3 rounded-grade-pill"
            >
              Not Yet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegroupingModal;
