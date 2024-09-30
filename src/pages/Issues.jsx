import IssuesList from '../components/IssuesList';
import LabelList from '../components/LabelList';
import StatusSelect from '../components/StatusSelect';
import { useState } from 'react';

export default function Issues() {
    const [labels, setLabels] = useState([]);
    const [status, setStatus] = useState('');
    const handleToggleLabels = (label) => {
        setLabels((currentLabels) =>
            currentLabels.includes(label)
                ? currentLabels.filter((l) => l !== label)
                : currentLabels.concat(label)
        );
    };
    return (
        <div>
            <main>
                <section>
                    <h1>Issues</h1>
                    <IssuesList labels={labels} status={status} />
                </section>
                <aside>
                    <LabelList selected={labels} toggle={handleToggleLabels} />
                    <h3>Status</h3>
                    <StatusSelect
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                    />
                </aside>
            </main>
        </div>
    );
}
