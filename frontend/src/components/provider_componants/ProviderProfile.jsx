import { useState, useEffect } from 'react'
import useAccounts from "../../hooks/useAccounts";

export default function ProviderProfile({ provider_id }) {

    const { provider, getProviderInfos, modifyUserInfos, error, loading } = useAccounts();

    const [last_name, setLastName] = useState('');
    const [first_name, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(null);
    const [phone, setPhone] = useState('');
    const [picture, setPicture] = useState(null)

    useEffect(() => {
        getProviderInfos(provider_id);
    }, [provider_id]);

    useEffect(() => {
        if (provider?.user) {
            setFirstName(provider.user.first_name);
            setLastName(provider.user.last_name);
            setEmail(provider.user.email);
            setUsername(provider.user.username);
            setPhone(provider.user.phone);
        }
    }, [provider]);

    const hadleFormSubmit = async (e) => {
        e.preventDefault();

        // Create a new object to hold only non-null fields
        const newInfos = {
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            phone: phone,
        };

        // Add picture and password fields only if they are not null
        if (password !== null) {
            newInfos.password = password;
        }

        if (picture !== null) {
            newInfos.picture = picture;
        }

        console.log(newInfos);

        try {
            await modifyUserInfos(provider.user.id, newInfos);
        } catch (error) {
            console.error('Error submitting ticket:', error);
        }
    };
    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator while fetching data
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Display error message if an error occurs
    }

    return (
        <>
            <form onSubmit={hadleFormSubmit} className="form-edit-profile">
                <div className="user-profile">
                    <div className="title">Contact details</div>
                    <fieldset>
                        <h6>First Name</h6>
                        <input type="text" placeholder={provider?.user?.first_name} value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
                    </fieldset>
                    <fieldset>
                        <h6>Last Name</h6>
                        <input type="text" placeholder={provider?.user?.last_name} value={last_name} onChange={(e) => setLastName(e.target.value)} required />
                    </fieldset>
                    <fieldset>
                        <h6>Username</h6>
                        <input type="text" placeholder={provider?.user?.username} value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </fieldset>
                </div>
                <div className="user-profile">
                    <div className="title">Contact details</div>
                    <fieldset>
                        <h6>Email Address</h6>
                        <input type="text" placeholder={provider?.user?.email} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </fieldset>
                    <fieldset>
                        <h6>Phone</h6>
                        <input type="text" placeholder={provider?.user?.phone} value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </fieldset>

                </div>
                <button className="btn-form" type="submit">
                    Update Settings
                </button>
            </form></>
    )
}
