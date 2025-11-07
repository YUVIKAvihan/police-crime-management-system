const http = require('http');

// Function to make HTTP requests
function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(responseData);
          resolve({ statusCode: res.statusCode, data: response });
        } catch (error) {
          resolve({ statusCode: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      if (typeof data === 'string') {
        req.write(data);
      } else {
        req.write(JSON.stringify(data));
      }
    }
    req.end();
  });
}

async function createIndianSampleData() {
  try {
    console.log('🇮🇳 Creating Indian Police Department sample data...\n');

    // Login as admin to get token
    console.log('1. 🔐 Logging in as admin...');
    const loginData = {
      email: 'admin@police.gov',
      password: 'admin123'
    };

    const loginOptions = {
      hostname: 'localhost',
      port: 5001,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    const loginResult = await makeRequest(loginOptions, loginData);
    if (loginResult.statusCode !== 200) {
      console.log('❌ Failed to login as admin');
      return;
    }

    const token = loginResult.data.token;
    const userId = loginResult.data.user.id;
    console.log('✅ Admin login successful!');

    // Create Indian criminals
    console.log('\n2. 👥 Creating criminal profiles (Indian data)...');

    const criminals = [
      {
        name: 'Rajesh Kumar Singh',
        age: 35,
        gender: 'male',
        address: {
          street: '123 MG Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          country: 'India'
        },
        previousCrimes: ['चोरी | Theft (2019)', 'सेंधमारी | Burglary (2020)', 'हमला | Assault (2018)'],
        identificationMarks: 'बाएं गाल पर निशान, दाहिने हाथ पर टैटू | Scar on left cheek, tattoo on right arm',
        status: 'active'
      },
      {
        name: 'Priya Sharma',
        age: 28,
        gender: 'female',
        address: {
          street: '456 Connaught Place',
          city: 'New Delhi',
          state: 'Delhi',
          zipCode: '110001',
          country: 'India'
        },
        previousCrimes: ['क्रेडिट कार्ड धोखाधड़ी | Credit Card Fraud (2021)', 'पहचान की चोरी | Identity Theft (2020)'],
        identificationMarks: 'गर्दन पर जन्मचिह्न, कलाई पर गुलाब का टैटू | Birthmark on neck, rose tattoo on wrist',
        status: 'imprisoned'
      },
      {
        name: 'Amit Patel',
        age: 42,
        gender: 'male',
        address: {
          street: '789 SG Highway',
          city: 'Ahmedabad',
          state: 'Gujarat',
          zipCode: '380015',
          country: 'India'
        },
        previousCrimes: ['नशीली दवाओं का कब्जा | Drug Possession (2019)', 'तोड़फोड़ | Vandalism (2017)'],
        identificationMarks: 'दोनों हाथों पर कई टैटू | Multiple tattoos on both arms',
        status: 'active'
      },
      {
        name: 'Sunita Reddy',
        age: 31,
        gender: 'female',
        address: {
          street: '321 Banjara Hills',
          city: 'Hyderabad',
          state: 'Telangana',
          zipCode: '500034',
          country: 'India'
        },
        previousCrimes: ['दुकान से चोरी | Shoplifting (2020)', 'अतिचार | Trespassing (2019)'],
        identificationMarks: 'बाईं भौंह के ऊपर छोटा निशान | Small scar above left eyebrow',
        status: 'active'
      },
      {
        name: 'Vikram Singh Rathore',
        age: 39,
        gender: 'male',
        address: {
          street: '654 Civil Lines',
          city: 'Jaipur',
          state: 'Rajasthan',
          zipCode: '302006',
          country: 'India'
        },
        previousCrimes: ['सशस्त्र डकैती | Armed Robbery (2018)', 'घातक हथियार से हमला | Assault with Deadly Weapon (2017)'],
        identificationMarks: 'बाएं कंधे पर गोली का निशान | Bullet scar on left shoulder',
        status: 'imprisoned'
      }
    ];

    const createdCriminals = [];

    for (let i = 0; i < criminals.length; i++) {
      const criminal = criminals[i];

      const options = {
        hostname: 'localhost',
        port: 5001,
        path: '/api/criminals',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const result = await makeRequest(options, criminal);
        if (result.statusCode === 201) {
          console.log(`✅ Created criminal: ${criminal.name}`);
          createdCriminals.push(result.data.criminal);
        } else {
          console.log(`❌ Failed to create criminal: ${criminal.name}`);
        }
      } catch (error) {
        console.log(`❌ Error creating criminal ${criminal.name}:`, error.message);
      }
    }

    // Create Indian crimes
    console.log('\n3. 🚨 Creating crime records (Indian locations)...');

    const crimes = [
      {
        title: 'मुंबई बैंक डकैती | Mumbai Bank Robbery',
        type: 'robbery',
        description: 'State Bank of India, Colaba branch में सशस्त्र डकैती। तीन नकाबपोश संदिग्धों ने दोपहर 2:30 बजे बैंक में प्रवेश किया और बंदूक की नोक पर कैशियर से पैसे की मांग की। लगभग ₹45 लाख की चोरी हुई। | Armed robbery at State Bank of India, Colaba branch. Three masked suspects entered the bank at 2:30 PM and demanded money at gunpoint. Approximately ₹45 lakhs stolen.',
        location: {
          address: 'Colaba Causeway, Near Gateway of India',
          city: 'Mumbai',
          state: 'Maharashtra'
        },
        date: '2024-01-15',
        status: 'under_investigation',
        officerInCharge: userId,
        suspects: createdCriminals.length > 0 ? [createdCriminals[0]._id] : [],
        victims: [{
          name: 'Anjali Deshmukh',
          age: 32,
          gender: 'female',
          contact: '+91-9876543210',
          address: 'Dadar, Mumbai, Maharashtra'
        }],
        priority: 'high'
      },
      {
        title: 'दिल्ली आवासीय सेंधमारी | Delhi Residential Burglary',
        type: 'burglary',
        description: 'Greater Kailash में आवासीय संपत्ति में सेंधमारी। इलेक्ट्रॉनिक्स, आभूषण और नकदी सहित लगभग ₹8 लाख की चोरी। जबरन प्रवेश का कोई संकेत नहीं। | Break-in at residential property in Greater Kailash. Electronics, jewelry, and cash worth approximately ₹8 lakhs stolen. No signs of forced entry.',
        location: {
          address: 'Greater Kailash Part 2',
          city: 'New Delhi',
          state: 'Delhi'
        },
        date: '2024-01-20',
        status: 'open',
        officerInCharge: userId,
        suspects: createdCriminals.length > 1 ? [createdCriminals[1]._id] : [],
        victims: [{
          name: 'Rahul Kapoor',
          age: 45,
          gender: 'male',
          contact: '+91-9876543211',
          address: 'Greater Kailash, New Delhi'
        }],
        priority: 'medium'
      },
      {
        title: 'बेंगलुरु साइबर अपराध | Bangalore Cybercrime',
        type: 'cybercrime',
        description: 'बड़े पैमाने पर पहचान की चोरी का ऑपरेशन। पीड़ितों ने बैंक खातों, क्रेडिट कार्ड और व्यक्तिगत जानकारी तक अनधिकृत पहुंच की सूचना दी। नकली बैंकिंग वेबसाइटों के माध्यम से फ़िशिंग योजना। 50+ पीड़ित, कुल नुकसान ₹2 करोड़ से अधिक। | Large-scale identity theft operation. Victims reported unauthorized access to bank accounts and credit cards. Phishing scheme through fake banking websites. 50+ victims, total losses exceeding ₹2 crores.',
        location: {
          address: 'Koramangala, Electronic City',
          city: 'Bangalore',
          state: 'Karnataka'
        },
        date: '2024-01-25',
        status: 'closed',
        officerInCharge: userId,
        suspects: createdCriminals.length > 2 ? [createdCriminals[2]._id] : [],
        victims: [{
          name: 'Deepak Menon',
          age: 38,
          gender: 'male',
          contact: '+91-9876543212',
          address: 'Indiranagar, Bangalore, Karnataka'
        }],
        priority: 'critical'
      },
      {
        title: 'पुणे में हमला | Assault in Pune',
        type: 'assault',
        description: 'FC Road पर स्थित बार में शारीरिक झगड़े के परिणामस्वरूप गंभीर चोटें आईं। संदिग्ध ने खेल के खेल पर बहस के दौरान टूटी बोतल से पीड़ित पर हमला किया। | Physical altercation at bar on FC Road resulted in serious injuries. Suspect attacked victim with broken bottle during argument over sports.',
        location: {
          address: 'Fergusson College Road',
          city: 'Pune',
          state: 'Maharashtra'
        },
        date: '2024-02-01',
        status: 'under_investigation',
        officerInCharge: userId,
        suspects: createdCriminals.length > 3 ? [createdCriminals[3]._id] : [],
        victims: [{
          name: 'Karan Malhotra',
          age: 29,
          gender: 'male',
          contact: '+91-9876543213',
          address: 'Koregaon Park, Pune, Maharashtra'
        }],
        priority: 'high'
      },
      {
        title: 'चेन्नई नशीली दवाओं की तस्करी | Chennai Drug Trafficking',
        type: 'drug_offense',
        description: 'बहु-महीने की जांच से बड़े पैमाने पर नशीली दवाओं की तस्करी का ऑपरेशन उजागर हुआ। गोदाम में सर्च वारंट निष्पादित करने पर 50 किलो कोकीन, 20 किलो हेरोइन और ₹1.5 करोड़ नकद बरामद। | Multi-month investigation uncovered large-scale drug trafficking operation. Search warrant at warehouse revealed 50kg cocaine, 20kg heroin, and ₹1.5 crores cash.',
        location: {
          address: 'Ambattur Industrial Estate',
          city: 'Chennai',
          state: 'Tamil Nadu'
        },
        date: '2024-02-05',
        status: 'under_investigation',
        officerInCharge: userId,
        suspects: createdCriminals.length > 4 ? [createdCriminals[4]._id] : [],
        victims: [{
          name: 'समुदाय | Community at Large',
          gender: 'other',
          contact: 'N/A',
          address: 'Chennai Community'
        }],
        priority: 'critical'
      },
      {
        title: 'कोलकाता वाहन चोरी | Kolkata Vehicle Theft',
        type: 'theft',
        description: 'संगठित वाहन चोरी गिरोह लक्जरी कारों को निशाना बना रहा है। 2 सप्ताह की अवधि में 12 वाहन चोरी, कुल मूल्य ₹5 करोड़ से अधिक। | Organized vehicle theft ring targeting luxury cars. 12 vehicles stolen over 2-week period, total value exceeding ₹5 crores.',
        location: {
          address: 'Salt Lake City, Sector V',
          city: 'Kolkata',
          state: 'West Bengal'
        },
        date: '2024-02-08',
        status: 'open',
        officerInCharge: userId,
        suspects: [],
        victims: [{
          name: 'Sanjay Chatterjee',
          age: 41,
          gender: 'male',
          contact: '+91-9876543214',
          address: 'Park Street, Kolkata, West Bengal'
        }],
        priority: 'high'
      },
      {
        title: 'जयपुर में तोड़फोड़ | Vandalism in Jaipur',
        type: 'vandalism',
        description: 'सेंट्रल पार्क में खेल के मैदान के उपकरण, बेंच और शौचालय सुविधाओं को व्यापक भित्तिचित्र क्षति। अनुमानित मरम्मत लागत ₹15 लाख। | Extensive graffiti damage to playground equipment, benches, and restroom facilities at Central Park. Estimated repair costs ₹15 lakhs.',
        location: {
          address: 'Central Park, Jaipur',
          city: 'Jaipur',
          state: 'Rajasthan'
        },
        date: '2024-02-10',
        status: 'closed',
        officerInCharge: userId,
        suspects: [],
        victims: [{
          name: 'जयपुर नगर निगम | Jaipur Municipal Corporation',
          gender: 'other',
          contact: '0141-2222222',
          address: 'City Hall, Jaipur, Rajasthan'
        }],
        priority: 'low'
      }
    ];

    let crimeSuccessCount = 0;

    for (let i = 0; i < crimes.length; i++) {
      const crime = crimes[i];

      const options = {
        hostname: 'localhost',
        port: 5001,
        path: '/api/crimes',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const result = await makeRequest(options, crime);
        if (result.statusCode === 201) {
          console.log(`✅ Created crime: ${crime.title}`);
          crimeSuccessCount++;
        } else {
          console.log(`❌ Failed to create crime: ${crime.title}`);
        }
      } catch (error) {
        console.log(`❌ Error creating crime ${crime.title}:`, error.message);
      }
    }

    console.log('\n🎉 Indian sample data creation completed!');
    console.log(`✅ Created ${createdCriminals.length} criminals`);
    console.log(`✅ Created ${crimeSuccessCount} crimes`);
    console.log('\n🇮🇳 Your Indian Police Management System is fully loaded!');
    console.log('📍 Go to: http://localhost:8081');
    console.log('👤 Login: admin@police.gov / admin123');
    console.log('\n📊 You now have:');
    console.log('   • भारतीय शहरों के अपराध रिकॉर्ड | Crime records from Indian cities');
    console.log('   • भारतीय आपराधिक प्रोफाइल | Indian criminal profiles');
    console.log('   • हिंदी और अंग्रेजी में डेटा | Data in Hindi and English');
    console.log('   • भारतीय पते और संपर्क | Indian addresses and contacts');
    console.log('   • पेशेवर पुलिस डेटा | Professional police data');

  } catch (error) {
    console.error('❌ Error creating Indian sample data:', error.message);
  }
}

createIndianSampleData();