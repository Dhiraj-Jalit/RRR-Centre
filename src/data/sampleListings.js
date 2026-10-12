/**
 * Sample items available in the community marketplace.
 * Lightweight SVG data URIs ensure instant mobile rendering without external CDN calls.
 */

export const initialMarketplaceListings = [
  {
    id: 'item-101',
    refNumber: 'RRR-BTR-2026-101',
    title: {
      en: 'Stainless Steel Dinner Plates (Set of 6)',
      mr: 'स्टेनलेस स्टील जेवणाची ताटे (६ चा संच)',
      hi: 'स्टेनलेस स्टील खाने की थालियां (6 का सेट)'
    },
    category: 'catUtensils',
    condition: 'good', // 'new' | 'good' | 'needsRepair'
    isDonation: true,
    price: 0,
    quantity: 1,
    village: 'Ward 3, Butibori Gaon',
    dropoffPoint: 'btr-nagarpalika',
    dropoffPointNameKey: 'points.point1Title',
    description: {
      en: 'Heavy gauge steel plates, fully cleaned and sanitized. Good for a family.',
      mr: 'जाड स्टीलची स्वच्छ केलेली ताटे. कुटुंबासाठी अगदी उत्तम.',
      hi: 'मजबूत स्टील की साफ की हुई थालियां। परिवार के लिए एकदम सही।'
    },
    dateAdded: '2026-10-05',
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'item-102',
    refNumber: 'RRR-BTR-2026-102',
    title: {
      en: 'Wooden School Study Desk & Bench',
      mr: 'लाकडी शालेय अभ्यास टेबल व बाक',
      hi: 'लकड़ी की पढ़ाई की मेज़ व बेंच'
    },
    category: 'catHousehold',
    condition: 'good',
    isDonation: false,
    price: 250,
    quantity: 1,
    village: 'Sector 27, Butibori MIDC',
    dropoffPoint: 'btr-nagarpalika',
    dropoffPointNameKey: 'points.point1Title',
    description: {
      en: 'Solid wood student desk with book rack. Minor surface scratches, very sturdy.',
      mr: 'पुस्तके ठेवण्याची जागा असलेले मजबूत लाकडी टेबल. अगदी बळकट.',
      hi: 'किताबें रखने की जगह वाली मजबूत लकड़ी की मेज़। बहुत टिकाऊ।'
    },
    dateAdded: '2026-10-06',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'item-103',
    refNumber: 'RRR-BTR-2026-103',
    title: {
      en: 'Class 10 State Board Textbooks & Guides',
      mr: 'इयत्ता १० वी राज्य मंडळ पाठ्यपुस्तके व गाईड',
      hi: 'कक्षा 10वीं स्टेट बोर्ड पाठ्यपुस्तकें व गाइड'
    },
    category: 'catBooks',
    condition: 'good',
    isDonation: true,
    price: 0,
    quantity: 1,
    village: 'Ward 1, Station Road',
    dropoffPoint: 'btr-nagarpalika',
    dropoffPointNameKey: 'points.point1Title',
    description: {
      en: 'Complete set of Marathi & English medium 10th standard books with solved papers.',
      mr: 'मराठी व इंग्रजी माध्यमाची १० वी ची सर्व विषयांची पुस्तके. गरजू विद्यार्थ्यासाठी.',
      hi: 'कक्षा 10वीं की सभी विषयों की पुस्तकें। ज़रूरतमंद विद्यार्थी के लिए।'
    },
    dateAdded: '2026-10-07',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'item-104',
    refNumber: 'RRR-BTR-2026-104',
    title: {
      en: 'Children 20-inch Bicycle',
      mr: 'लहान मुलांची २० इंची सायकल',
      hi: 'बच्चों की 20 इंच साइकिल'
    },
    category: 'catCycles',
    condition: 'needsRepair',
    isDonation: false,
    price: 350,
    quantity: 1,
    village: 'Takalghat Road, Butibori',
    dropoffPoint: 'btr-nagarpalika',
    dropoffPointNameKey: 'points.point1Title',
    description: {
      en: 'Frame and tyres in good condition. Needs brake wire replacement and oiling.',
      mr: 'फ्रेम आणि टायर उत्तम आहेत. फक्त ब्रेक वायर आणि ऑइलिंग करणे आवश्यक.',
      hi: 'फ्रेम और टायर अच्छी हालत में हैं। केवल ब्रेक तार और तेल लगाने की ज़रूरत है।'
    },
    dateAdded: '2026-10-08',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'item-105',
    refNumber: 'RRR-BTR-2026-105',
    title: {
      en: 'Cotton Warm Blankets (Set of 2)',
      mr: 'सुती उबदार चादरी व गोधड्या (२ चा संच)',
      hi: 'सूती गर्म चादरें व कम्बल (2 का सेट)'
    },
    category: 'catClothes',
    condition: 'new',
    isDonation: true,
    price: 0,
    quantity: 2,
    village: 'Bori Gaon, Near Canal',
    dropoffPoint: 'btr-nagarpalika',
    dropoffPointNameKey: 'points.point1Title',
    description: {
      en: 'Unused cotton handloom blankets. Freshly washed and packed.',
      mr: 'वापरात नसलेल्या सुती हातमाग चादरी. धुतलेल्या आणि स्वच्छ.',
      hi: 'अप्रयुक्त सूती हथकरघा चादरें। साफ़-सुथरी और सुरक्षित।'
    },
    dateAdded: '2026-10-09',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'item-106',
    refNumber: 'RRR-BTR-2026-106',
    title: {
      en: 'Table Fan (Bajaj 400mm)',
      mr: 'टेबल फॅन (बजाज ४०० मिमी)',
      hi: 'टेबल फैन (बजाज 400 मिमी)'
    },
    category: 'catElectronics',
    condition: 'good',
    isDonation: false,
    price: 180,
    quantity: 1,
    village: 'MIDC Colony, Sector 2',
    dropoffPoint: 'btr-nagarpalika',
    dropoffPointNameKey: 'points.point1Title',
    description: {
      en: '3-speed table fan in working condition. Tested at municipal workshop.',
      mr: '३ स्पीड टेबल फॅन चालू स्थितीत. नगर परिषद कार्यशाळेत तपासून घेतलेला.',
      hi: '3-स्पीड टेबल फैन चालू हालत में। कार्यशाला में जांचा गया।'
    },
    dateAdded: '2026-10-09',
    imageUrl: 'https://images.unsplash.com/photo-1618941716939-553df3c6c278?w=400&auto=format&fit=crop&q=60'
  }
];
