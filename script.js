// Temple Configuration
const TEMPLE_NAME = "Arulmigu Sivakamasundari Udanurai Chithambareswarar Temple";
const TEMPLE_LOCATION = "Udanurai, Mettupatti";
const TEMPLE_PHONE = "9443915395";
const TEMPLE_UPI = "9443915395@okaxis"; // UPI ID format
const ACCOUNT_HOLDER = "Sssudeep 2009"; // Actual account holder name

// Set current donation amount
let currentAmount = 0;

// Show donation modal
function showDonateOptions() {
    const modal = document.getElementById("donationModal");
    if (modal) {
        modal.style.display = "block";
        showPaymentOptions();
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById("donationModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("donationModal");
    if (modal && event.target === modal) {
        modal.style.display = "none";
    }
}

// Initiate payment for preset amounts
function initiatePayment(amount) {
    currentAmount = amount;
    showDonateOptions();
}

// Donate custom amount
function donateCustom() {
    const customAmount = document.getElementById("customAmount");
    const amount = customAmount.value;
    
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }
    
    currentAmount = amount;
    showDonateOptions();
}

// Show payment options
function showPaymentOptions() {
    const modal = document.getElementById("donationModal");
    const modalContent = modal.querySelector(".modal-content");
    
    const paymentHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>💚 Complete Your Donation - ₹${currentAmount}</h2>
        <p style="text-align: center; color: #666; margin-bottom: 1.5rem;">Select your preferred payment method:</p>
        
        <div class="payment-methods">
            <button onclick="showMobileNumberPayment()" class="payment-btn mobile-btn" style="order: 1; background: #4caf50;">
                <span style="font-size: 24px;">📞</span>
                <span>Direct Mobile Number<br><small style="font-size: 11px;">⭐ BEST METHOD - No Errors</small></span>
            </button>
            
            <button onclick="initiateGooglePayDirect()" class="payment-btn google-pay-btn" style="order: 2;">
                <span style="font-size: 24px;">🏦</span>
                <span>Google Pay<br><small style="font-size: 10px;">(Direct - No QR)</small></span>
            </button>
            
            <button onclick="initiatePhonePeDirect()" class="payment-btn phonepe-btn" style="order: 3;">
                <span style="font-size: 24px;">📱</span>
                <span>PhonePe<br><small style="font-size: 10px;">(Direct - No QR)</small></span>
            </button>
        </div>
        
        <button onclick="showManualPaymentInstructions()" style="width: 100%; margin-top: 1rem; padding: 0.8rem; background: #f0f0f0; color: #333; border: 1px solid #ddd; border-radius: 8px; font-weight: bold; cursor: pointer;">
            ℹ️ All Payment Methods
        </button>
    `;
    
    modalContent.innerHTML = paymentHTML;
}

// Initiate Google Pay - Direct without QR code
function initiateGooglePayDirect() {
    if (currentAmount <= 0) {
        alert("Please select an amount first!");
        return;
    }
    
    // Google Pay deep link - Direct UPI without QR
    const googlePayUrl = `gpay://upi/pay?pa=${TEMPLE_UPI}&payeeAddress=${TEMPLE_UPI}&pn=${encodeURIComponent(ACCOUNT_HOLDER)}&am=${currentAmount}&tn=Donation&tr=${generateTransactionId()}`;
    
    console.log("Opening Google Pay directly...");
    window.location.href = googlePayUrl;
    
    // Fallback to mobile payment if app doesn't open
    setTimeout(() => {
        showMobileNumberPayment();
    }, 2500);
}

// Initiate PhonePe - Direct without QR code
function initiatePhonePeDirect() {
    if (currentAmount <= 0) {
        alert("Please select an amount first!");
        return;
    }
    
    // PhonePe direct UPI link without QR
    const phonePeUrl = `upi://pay?pa=${TEMPLE_UPI}&pn=${encodeURIComponent(ACCOUNT_HOLDER)}&am=${currentAmount}&tn=Donation&tr=${generateTransactionId()}`;
    
    console.log("Opening PhonePe directly...");
    window.location.href = phonePeUrl;
    
    // Fallback to mobile payment if app doesn't open
    setTimeout(() => {
        showMobileNumberPayment();
    }, 2500);
}

// Generate unique transaction ID
function generateTransactionId() {
    return "TEMPLE" + Math.floor(Math.random() * 1000000000);
}

// Show mobile number payment option (RECOMMENDED)
function showMobileNumberPayment() {
    const modal = document.getElementById("donationModal");
    const modalContent = modal.querySelector(".modal-content");
    
    const mobilePaymentHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>✅ Recommended: Send Money via Mobile Number</h2>
        <p style="text-align: center; color: #666; margin-bottom: 1.5rem;">This method works perfectly - No UPI/QR errors!</p>
        
        <div style="background: linear-gradient(135deg, #4caf50 0%, #45a049 100%); padding: 2rem; border-radius: 10px; margin: 1.5rem 0; text-align: center;">
            <p style="color: white; font-size: 13px; margin-bottom: 0.8rem;">Account Holder Name</p>
            <p style="color: white; font-size: 18px; font-weight: bold; margin: 0.5rem 0;">${ACCOUNT_HOLDER}</p>
            <p style="color: rgba(255,255,255,0.9); font-size: 13px; margin: 0.8rem 0;">Temple Mobile Number</p>
            <p style="color: white; font-size: 32px; font-weight: bold; margin: 0.5rem 0;">+91 ${TEMPLE_PHONE}</p>
            <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0.8rem 0;">Amount: ₹${currentAmount}</p>
        </div>
        
        <div style="background: #e8f4f8; padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0; text-align: left;">
            <h3 style="margin-top: 0; color: #333;">📱 Steps to Send Money:</h3>
            <ol style="padding-left: 1.5rem; line-height: 2; margin: 0;">
                <li><strong>Open Google Pay App</strong></li>
                <li><strong>Tap "Send Money"</strong> (NOT "Pay" or QR code)</li>
                <li><strong>Enter:</strong> <span style="color: #d32f2f; font-weight: bold;">+91 ${TEMPLE_PHONE}</span></li>
                <li><strong>Recipient Name:</strong> <span style="color: #4caf50; font-weight: bold;">${ACCOUNT_HOLDER}</span></li>
                <li><strong>Amount:</strong> <span style="color: #d32f2f; font-weight: bold;">₹${currentAmount}</span></li>
                <li><strong>Click SEND and Confirm</strong></li>
            </ol>
        </div>
        
        <div style="background: #fff3cd; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #ff9800;">
            <p style="margin: 0; color: #856404;"><strong>⚠️ IMPORTANT NOTES:</strong></p>
            <ul style="margin: 0.5rem 0; padding-left: 1.5rem; font-size: 13px; color: #856404;">
                <li>Use "SEND MONEY" option (do NOT use UPI/QR option)</li>
                <li>This avoids all QR code errors</li>
                <li>Works 100% of the time</li>
            </ul>
        </div>
        
        <button onclick="copyPhoneNumber()" style="width: 100%; padding: 0.8rem; background: linear-gradient(135deg, #4caf50, #45a049); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-bottom: 0.5rem;">
            📋 Copy Phone Number
        </button>
        
        <button onclick="sharePhoneViaWhatsApp()" style="width: 100%; padding: 0.8rem; background: linear-gradient(135deg, #25D366, #128C7E); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-bottom: 0.5rem;">
            💬 Share on WhatsApp
        </button>
        
        <button onclick="showPaymentOptions()" style="width: 100%; padding: 0.8rem; background: #f0f0f0; color: #333; border: 1px solid #ddd; border-radius: 8px; font-weight: bold; cursor: pointer;">
            ← Back to Payment Methods
        </button>
    `;
    
    modalContent.innerHTML = mobilePaymentHTML;
}

// Show manual payment instructions
function showManualPaymentInstructions() {
    const modal = document.getElementById("donationModal");
    const modalContent = modal.querySelector(".modal-content");
    
    const fallbackHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>📖 All Payment Methods</h2>
        
        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0;">
            <h3 style="color: #333; margin-top: 0;">✅ Payment Methods:</h3>
            
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 8px; border-left: 4px solid #4caf50; box-shadow: 0 2px 4px rgba(76,175,80,0.2);">
                <h4 style="margin-top: 0; color: #4caf50;">⭐ RECOMMENDED: Send Money (Mobile Number)</h4>
                <p style="margin: 0.5rem 0;"><strong>Account Holder:</strong> ${ACCOUNT_HOLDER}</p>
                <p style="margin: 0.5rem 0;"><strong>Mobile:</strong> <span style="font-size: 16px; font-weight: bold; color: #4caf50;">+91 ${TEMPLE_PHONE}</span></p>
                <p style="font-size: 13px; color: #666; margin: 0.5rem 0;">
                    ✅ No QR code errors<br>
                    ✅ Works 100% reliably<br>
                    ✅ Use "SEND MONEY" option only
                </p>
            </div>
            
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 8px; border-left: 4px solid #667eea;">
                <h4 style="margin-top: 0; color: #667eea;">Via Direct UPI Link</h4>
                <p style="margin: 0.5rem 0;"><strong>UPI ID:</strong></p>
                <p style="background: #f0f0f0; padding: 0.8rem; border-radius: 5px; text-align: center; font-weight: bold; color: #667eea; margin: 0.5rem 0;">
                    ${TEMPLE_UPI}
                </p>
                <p style="font-size: 13px; color: #ff9800; margin: 0.5rem 0;">
                    ⚠️ May show "Could not pay to this QR code" error<br>
                    Use Send Money method instead
                </p>
            </div>
            
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 8px; border-left: 4px solid #25D366;">
                <h4 style="margin-top: 0; color: #25D366;">💬 Contact via WhatsApp</h4>
                <p style="margin: 0.5rem 0;"><strong>Number:</strong> +91 ${TEMPLE_PHONE}</p>
                <p style="font-size: 13px; color: #666; margin: 0.5rem 0;">Send us a message for payment help</p>
            </div>
        </div>
        
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #2196F3;">
            <p style="margin: 0; color: #1565c0;"><strong>💡 Why "Send Money" works better:</strong></p>
            <ul style="margin: 0.5rem 0; padding-left: 1.5rem; font-size: 13px; color: #1565c0;">
                <li>Avoids QR code scanning entirely</li>
                <li>Direct mobile number transfer</li>
                <li>No verification errors</li>
                <li>100% payment success rate</li>
            </ul>
        </div>
        
        <button onclick="showPaymentOptions()" style="width: 100%; padding: 0.8rem; background: linear-gradient(135deg, #4caf50, #45a049); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
            ← Back to Payment Methods
        </button>
    `;
    
    modalContent.innerHTML = fallbackHTML;
}

// Copy phone number to clipboard
function copyPhoneNumber() {
    const phoneText = "+91 " + TEMPLE_PHONE;
    navigator.clipboard.writeText(phoneText).then(() => {
        alert("✅ Phone number copied!\n\n" + phoneText + "\n\nUse 'Send Money' in Google Pay");
    }).catch(() => {
        alert("Phone: " + phoneText);
    });
}

// Share phone number via WhatsApp
function sharePhoneViaWhatsApp() {
    const message = `🏛️ ${TEMPLE_NAME}\n\n💚 Donation Request\n\nAmount: ₹${currentAmount}\n\n📱 Send Money To:\n${ACCOUNT_HOLDER}\n+91 ${TEMPLE_PHONE}\n\n🙏 Thank you!`;
    const whatsappUrl = `https://wa.me/91${TEMPLE_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Copy UPI ID to clipboard
function copyUPI() {
    const upiText = TEMPLE_UPI;
    navigator.clipboard.writeText(upiText).then(() => {
        alert("✅ UPI ID copied!\n\n" + upiText);
    }).catch(() => {
        alert("UPI ID: " + upiText);
    });
}

// Share payment details
function sharePaymentDetails() {
    const text = `🏛️ ${TEMPLE_NAME}\n\n💚 Donate Now!\n\nBest Way: Send Money to\n${ACCOUNT_HOLDER}\n+91 ${TEMPLE_PHONE}\n\nAmount: ₹${currentAmount}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Temple Donation',
            text: text
        });
    } else {
        alert(text);
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Donation System Ready");
    console.log("Temple:", TEMPLE_NAME);
    console.log("Phone:", TEMPLE_PHONE);
    console.log("Account:", ACCOUNT_HOLDER);
});

// Log donation for analytics
function logDonation(amount, method) {
    const timestamp = new Date().toLocaleString();
    console.log(`✅ Donation Logged - ₹${amount} via ${method}`);
    
    let donations = JSON.parse(localStorage.getItem('donations') || '[]');
    donations.push({
        amount: amount,
        method: method,
        timestamp: timestamp
    });
    localStorage.setItem('donations', JSON.stringify(donations));
}
