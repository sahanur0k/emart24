const axios = require('axios');

const testLogin = async () => {
  try {
    console.log('🔐 Testing login with test@hayroo.com...');
    
    const loginResponse = await axios.post('http://localhost:8000/api/signin', {
      email: 'test@hayroo.com',
      password: 'password123'
    });
    
    console.log('✅ Login successful!');
    console.log('JWT Token:', loginResponse.data.token);
    console.log('User:', loginResponse.data.user);
    
    // Test the token by fetching user data
    const userId = loginResponse.data.user._id;
    console.log('\n🔍 Testing user data fetch...');
    
    const userResponse = await axios.post('http://localhost:8000/api/user/signle-user', {
      uId: userId
    });
    
    console.log('✅ User data fetch successful!');
    console.log('User data:', userResponse.data);
    
    // Test super coins fetch
    console.log('\n🪙 Testing super coins fetch...');
    
    const superCoinsResponse = await axios.post('http://localhost:8000/api/super-coin/user-super-coins', {
      uId: userId
    });
    
    console.log('✅ Super coins fetch successful!');
    console.log('Super coins data:', superCoinsResponse.data);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
};

testLogin();
