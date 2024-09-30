const possibleStatuses = [
    { id: 'backlog', label: 'backlog' },
    { id: 'todo', label: 'To Do' },
    { id: 'inProgress', label: 'In Progress' },
    { id: 'done', label: 'Done' },
    { id: 'cancelled', label: 'Cancelled' },
];

export default function StatusSelect({ value, onChange }) {
    return (
        <select value={value} onChange={onChange} className="status-select">
            <option value="">Select status to filter</option>
            {possibleStatuses.map((status) => (
                <option key={status.id}>{status.label}</option>
            ))}
        </select>
    );
}
