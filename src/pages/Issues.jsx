import IssuesList from '../components/IssuesList';
import LabelList from '../components/LabelList';
import { useState } from 'react';
export default function Issues() {
    const [labels, setLabels] = useState([]);
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
                    <IssuesList labels={labels} />
                </section>
                <aside>
                    <LabelList selected={labels} toggle={handleToggleLabels} />
                </aside>
            </main>
        </div>
    );
}
