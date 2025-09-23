import React from 'react';

const TestCredentials = () => {
  const credentials = [
    { username: 'testuser', email: 'test@example.com', password: 'password123' },
    { username: 'admin', email: 'admin@example.com', password: 'admin123' },
    { username: 'demo', email: 'demo@example.com', password: 'demo123' }
  ];

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">🧪 Test Credentials</h3>
      <p className="text-sm text-blue-700 mb-3">
        Use any of these credentials to test the application:
      </p>
      <div className="space-y-2">
        {credentials.map((cred, index) => (
          <div key={index} className="bg-white rounded p-3 border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div>
                <span className="font-medium text-gray-600">Username:</span>
                <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">{cred.username}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Email:</span>
                <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">{cred.email}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Password:</span>
                <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">{cred.password}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-blue-600 mt-2">
        💡 You can also create a new account using the signup form
      </p>
    </div>
  );
};

export default TestCredentials;
