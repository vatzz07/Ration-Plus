# Ration+ 📱  
### A Multilingual Digital Access Platform for Public Distribution System (PDS)

Ration+ is a mobile application designed to improve transparency, accessibility, and efficiency in India’s Public Distribution System (PDS).  
It provides real-time ration stock visibility, digital ration tracking, and assisted home delivery for vulnerable beneficiaries.

---

## 🚀 Problem Statement

The current PDS ecosystem faces challenges such as:
- No real-time visibility of ration stock for beneficiaries  
- Physical difficulty for elderly, disabled, and pregnant women to access ration shops  
- Limited digital access due to language barriers  
- Manual and inefficient beneficiary interaction  

---

## 💡 Solution Overview

Ration+ acts as a **citizen-facing digital layer** (not a replacement) for PDS by offering:
- Real-time ration shop stock availability  
- Digital ration quota tracking and notifications  
- Home delivery requests **only for elderly, disabled, and pregnant women**  
- Easy language switching (Tamil, English, Hindi)  

Delivery access is **time-bound and rule-controlled** to prevent misuse.

---

## 🧩 Key Features

- 📦 Live ration stock visibility  
- 📊 Digital ration card dashboard  
- 🚚 Assisted home delivery for eligible users  
- 🌐 Multilingual interface (Tamil / English / Hindi)  
- 🔔 Notifications for delivery and quota updates  

---

## 🏗️ Architecture Overview

- **Mobile App:** Flutter / React Native  
- **Authentication:** Firebase Authentication (OTP-based)  
- **Backend Logic:** Firebase Cloud Functions  
- **Database:** Cloud Firestore  
- **AI Verification:** Gemini API (document analysis & validation)  
- **Notifications:** Firebase Cloud Messaging (FCM)  

> Biometric authentication remains unchanged at the ration shop level.

---

## 🤖 Why Gemini API?

Gemini API is used for **AI-assisted document verification**, not decision-making:
- Identifies document type (medical, disability, ID proof)  
- Extracts issue dates and key fields  
- Enables **time-bound eligibility**, especially for pregnancy (auto-expiry after ~10 months)  
- Flags unclear or suspicious documents for manual review  

---

## 🔐 Delivery Eligibility Rules

- Delivery is enabled **only** for:
  - Elderly citizens  
  - Persons with disabilities  
  - Pregnant women  
- Proof upload is **one-time**  
- Pregnancy-based delivery is **automatically time-bound**  
- Delivery does **not** increase ration quantity — only the mode of access  

---

## 🔮 Future Enhancements

- Government PDS API integration  
- Voice-assisted navigation  
- Admin & monitoring dashboard  
- AI-based demand and stock analytics  
- policy-based delivery rules  

---

## 🛠️ Tech Stack

- React Native  
- Firebase Authentication  
- Cloud Firestore  
- Gemini API  

---

## 📌 Disclaimer

Ration+ is a prototype built for demonstration and hackathon purposes.  
It does not replace existing government systems and is designed to align with current PDS policies.

---

## 👨‍💻 Author

Developed by **Srivatsan**  

