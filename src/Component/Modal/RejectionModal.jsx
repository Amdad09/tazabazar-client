// RejectionModal.jsx
import { useState } from 'react';
import toast from 'react-hot-toast';

const RejectionModal = ({ isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
        if (!reason) return;
        onSubmit(reason); 
        setReason('');
        onClose(); 
        toast.success('Rejected feedback successfully');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-96 space-y-4">
                <h3 className="text-lg font-bold">Rejection Reason</h3>
                <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Write rejection feedback..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                ></textarea>
                <div className="flex justify-end space-x-2">
                    <button className="btn btn-outline" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-error" onClick={handleSubmit}>
                        Submit Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RejectionModal;
