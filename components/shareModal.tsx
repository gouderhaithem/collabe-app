import { useState } from 'react';

type User = {
  name: string;
  email: string;
  permission: string;
};

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [email, setEmail] = useState('');
  const [permissions, setPermissions] = useState('can edit');
  const [users, setUsers] = useState<User[]>([
    { name: 'Candice Wu', email: 'candice@jsmasterypro.com', permission: 'can edit' },
    { name: 'Demi Wilkinson', email: 'demi@jsmasterypro.com', permission: 'can edit' },
    { name: 'Drew Cano', email: 'drew@jsmasterypro.com', permission: 'Owner' },
  ]);

  const [link, setLink] = useState('https://example.com/shared-project');
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [linkPermission, setLinkPermission] = useState('can view');

  const addUser = () => {
    setUsers([...users, { name: email, email: `${email}@domain.com`, permission: permissions }]);
    setEmail('');
  };

  const removeUser = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(link);
    setSnackBarVisible(true);
    setTimeout(() => setSnackBarVisible(false), 3000); // Snack bar disappears after 3 seconds
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 text-white rounded-lg p-8 w-full max-w-3xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl">
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Manage who can view this project</h2>
        <p className="text-sm text-gray-400 mb-6">Select which users can access and view this project.</p>

        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 p-3 rounded-l-md w-full"
          />
          <select
            value={permissions}
            onChange={(e) => setPermissions(e.target.value)}
            className="bg-gray-700 p-3 text-white"
          >
            <option value="can edit">can edit</option>
            <option value="can view">can view</option>
          </select>
          <button
            onClick={addUser}
            className="bg-blue-500 hover:bg-blue-600 p-3 rounded-r-md ml-2"
          >
            Invite
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {users.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gray-600 h-10 w-10 rounded-full flex items-center justify-center mr-3 text-white font-semibold">
                  {user.name[0]}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <select
                  value={user.permission}
                  className="bg-gray-700 text-white p-2 rounded-md mr-3"
                  onChange={(e) => {
                    const newUsers = [...users];
                    newUsers[index].permission = e.target.value;
                    setUsers(newUsers);
                  }}
                >
                  <option value="can edit">can edit</option>
                  <option value="can view">can view</option>
                </select>
                <button
                  onClick={() => removeUser(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center flex-col">
            <span className="text-gray-400 mb-2">Shareable Link</span>
            <div className="bg-gray-700 text-white p-2 rounded-md w-full text-center">
              {link}
            </div>
          </div>
          <div className="flex items-center">
            <select
              value={linkPermission}
              onChange={(e) => setLinkPermission(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-md mr-2"
            >
              <option value="can view">can view</option>
              <option value="can edit">can edit</option>
            </select>
            <button onClick={copyLinkToClipboard} className="text-blue-500 hover:underline">
              Copy link
            </button>
          </div>
        </div>

        {snackBarVisible && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-3 rounded-md shadow-lg">
            Link copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}
