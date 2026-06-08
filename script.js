// Mobile number for donations
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
            <button onclick="showMobileNumberPayment()" class="payment-btn mobile-btn" style="order: 1;">
                <span style="font-size: 24px;">📞</span>
                <span>Direct Mobile Number<br><small style="font-size: 11px;">(Recommended - No UPI Issues)</small></span>
            </button>
            
            <button onclick="payViaGPay()" class="payment-btn google-pay-btn" style="order: 2;">
                <span style="font-size: 24px;">🏦</span>
                <span>Google Pay</span>
            </button>
            
            <button onclick="payViaPhonePe()" class="payment-btn phonepe-btn" style="order: 3;">
                <span style="font-size: 24px;">📱</span>
                <span>PhonePe</span>
            </button>
            
            <button onclick="payViaUPI()" class="payment-btn upi-btn" style="order: 4;">
                <span style="font-size: 24px;">🔗</span>
                <span>Direct UPI</span>
            </button>
        </div>
        
        <button onclick="showManualPaymentInstructions()" style="width: 100%; margin-top: 1rem; padding: 0.8rem; background: #f0f0f0; color: #333; border: 1px solid #ddd; border-radius: 8px; font-weight: bold; cursor: pointer;">
            ℹ️ Manual Payment Instructions
        </button>
    `;
    
    modalContent.innerHTML = paymentHTML;
}

// Pay via Google Pay
function payViaGPay() {
    if (currentAmount <= 0) {
        alert("Please select an amount first!");
        return;
    }
    
    // Show warning about account holder name
    const userConfirm = confirm(`⚠️ IMPORTANT:\n\nThe UPI account is registered under: "${ACCOUNT_HOLDER}"\n\nWhen Google Pay opens:\n✅ Click "PROCEED" when asked about name mismatch\n✅ Confirm the payment with amount ₹${currentAmount}\n\nDo you want to continue?`);
    
    if (!userConfirm) {
        showPaymentOptions();
        return;
    }
    
    // Google Pay UPI scheme
    const upiString = `upi://pay?pa=${TEMPLE_UPI}&pn=${ACCOUNT_HOLDER}&am=${currentAmount}&tn=Donation%20to%20Temple&tr=${generateTransactionId()}`;
    
    console.log("Initiating Google Pay payment...");
    console.log("UPI String:", upiString);
    console.log("Account Holder:", ACCOUNT_HOLDER);
    
    // Try to open the UPI link
    window.location.href = upiString;
    
    // Fallback: Show the mobile number
    setTimeout(() => {
        showMobileNumberPayment();
    }, 2000);
}

// Pay via PhonePe
function payViaPhonePe() {
    if (currentAmount <= 0) {
        alert("Please select an amount first!");
        return;
    }
    
    // PhonePe deep link
    const phonepeLink = `phonepe://pay?to=${TEMPLE_UPI}&am=${currentAmount}&tn=Donation%20to%20Sithambareswarar%20Temple`;
    
    console.log("Initiating PhonePe payment...");
    
    window.location.href = phonepeLink;
    
    // Fallback
    setTimeout(() => {
        showMobileNumberPayment();
    }, 2000);
}

// Pay via Direct UPI
function payViaUPI() {
    if (currentAmount <= 0) {
        alert("Please select an amount first!");
        return;
    }
    
    // Show warning about account holder name
    const userConfirm = confirm(`⚠️ IMPORTANT:\n\nThe UPI account is registered under: "${ACCOUNT_HOLDER}"\n\nWhen your UPI app opens:\n✅ Confirm the payment with amount ₹${currentAmount}\n✅ Ignore name mismatches\n\nDo you want to continue?`);
    
    if (!userConfirm) {
        showPaymentOptions();
        return;
    }
    
    // Standard UPI scheme
    const upiString = `upi://pay?pa=${TEMPLE_UPI}&pn=${ACCOUNT_HOLDER}&am=${currentAmount}&tn=Donation%20to%20Temple&tr=${generateTransactionId()}`;
    
    console.log("Initiating UPI payment...");
    console.log("UPI String:", upiString);
    console.log("Account Holder:", ACCOUNT_HOLDER);
    
    window.location.href = upiString;
    
    // Fallback
    setTimeout(() => {
        showMobileNumberPayment();
    }, 2000);
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
        <p style="text-align: center; color: #666; margin-bottom: 1.5rem;">This method works with any payment app without UPI errors!</p>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 10px; margin: 1.5rem 0; text-align: center;">
            <p style="color: white; font-size: 13px; margin-bottom: 0.8rem;">Account Holder Name</p>
            <p style="color: white; font-size: 18px; font-weight: bold; margin: 0.5rem 0;">${ACCOUNT_HOLDER}</p>
            <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 0.8rem 0;">Temple Mobile Number</p>
            <p style="color: white; font-size: 32px; font-weight: bold; margin: 0.5rem 0;">+91 ${TEMPLE_PHONE}</p>
        </div>
        
        <div style="background: #e8f4f8; padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0; text-align: left;">
            <h3 style="margin-top: 0; color: #333;">📱 Steps to Pay:</h3>
            <ol style="padding-left: 1.5rem; line-height: 1.8;">
                <li><strong>Open Google Pay / PhonePe app</strong></li>
                <li><strong>Tap "Send Money" option</strong> (NOT "Request Money")</li>
                <li><strong>Enter mobile number:</strong> <span style="color: #667eea; font-weight: bold;">+91 ${TEMPLE_PHONE}</span></li>
                <li><strong>Select contact/recipient name:</strong> <span style="color: #764ba2; font-weight: bold;">${ACCOUNT_HOLDER}</span></li>
                <li><strong>Enter amount:</strong> <span style="color: #d32f2f; font-weight: bold;">₹${currentAmount}</span></li>
                <li><strong>Verify and Complete the payment</strong></li>
            </ol>
        </div>
        
        <div style="background: #fff3cd; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404;"><strong>💡 Pro Tips:</strong></p>
            <ul style="margin: 0.5rem 0; padding-left: 1.5rem; font-size: 13px;">
                <li>Use "Send Money" feature, not "Request Money"</li>
                <li>Account name: ${ACCOUNT_HOLDER}</li>
                <li>No UPI ID errors with this method!</li>
            </ul>
        </div>
        
        <button onclick="copyPhoneNumber()" style="width: 100%; padding: 0.8rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-bottom: 0.5rem;">
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
            <h3 style="color: #333; margin-top: 0;">✅ Payment Methods Available:</h3>
            
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 8px; border-left: 4px solid #4caf50;">
                <h4 style="margin-top: 0; color: #4caf50;">🌟 RECOMMENDED: Mobile Number (No UPI Issues)</h4>
                <p style="margin: 0.5rem 0;"><strong>Account Holder:</strong> ${ACCOUNT_HOLDER}</p>
                <p style="margin: 0.5rem 0;"><strong>Mobile Number:</strong></p>
                <p style="background: #f0f0f0; padding: 0.8rem; border-radius: 5px; text-align: center; font-weight: bold; color: #4caf50; margin: 0.5rem 0;">
                    +91 ${TEMPLE_PHONE}
                </p>
                <p style="font-size: 13px; color: #666; margin: 0.5rem 0;">✅ Use "Send Money" in Google Pay or PhonePe</p>
                <p style="font-size: 13px; color: #d32f2f; margin: 0.5rem 0;"><strong>⚠️ Best option - avoids all UPI ID verification errors</strong></p>
            </div>
            
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 8px; border-left: 4px solid #667eea;">
                <h4 style="margin-top: 0; color: #667eea;">🏦 Via UPI ID</h4>
                <p style="margin: 0.5rem 0;"><strong>Account Holder:</strong> ${ACCOUNT_HOLDER}</p>
                <p style="margin: 0.5rem 0;"><strong>UPI ID:</strong></p>
                <p style="background: #f0f0f0; padding: 0.8rem; border-radius: 5px; text-align: center; font-weight: bold; color: #667eea; margin: 0.5rem 0;">
                    ${TEMPLE_UPI}
                </p>
                <p style="font-size: 13px; color: #666; margin: 0.5rem 0;">Use with Google Pay, PhonePe, or any UPI app</p>
                <p style="font-size: 13px; color: #ff9800; margin: 0.5rem 0;"><strong>⚠️ Note:</strong> May show name mismatch - click "PROCEED" to continue</p>
            </div>
            
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 8px; border-left: 4px solid #25D366;">
                <h4 style="margin-top: 0; color: #25D366;">💬 Via WhatsApp</h4>
                <p style="margin: 0.5rem 0;"><strong>Contact:</strong> +91 ${TEMPLE_PHONE}</p>
                <p style="font-size: 13px; color: #666; margin: 0.5rem 0;">Contact us on WhatsApp to arrange payment or for help</p>
            </div>
        </div>
        
        <div style="background: #e8f5e9; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #4caf50;">
            <p style="margin: 0; color: #2e7d32;"><strong>✅ Amount to pay: ₹${currentAmount}</strong></p>
            <p style="margin: 0.5rem 0 0 0; color: #2e7d32; font-size: 13px;"><strong>Beneficiary:</strong> ${ACCOUNT_HOLDER}</p>
        </div>
        
        <button onclick="showPaymentOptions()" style="width: 100%; padding: 0.8rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
            ← Back to Payment Methods
        </button>
    `;
    
    modalContent.innerHTML = fallbackHTML;
}

// Copy phone number to clipboard
function copyPhoneNumber() {
    const phoneText = "+91 " + TEMPLE_PHONE;
    navigator.clipboard.writeText(phoneText).then(() => {
        alert("✅ Phone number copied to clipboard!\n\n" + phoneText + "\n\nAccount Holder: " + ACCOUNT_HOLDER);
    }).catch(() => {
        alert("Phone Number: " + phoneText + "\nAccount Holder: " + ACCOUNT_HOLDER);
    });
}

// Share phone number via WhatsApp
function sharePhoneViaWhatsApp() {
    const message = `🏛️ Sithambareswarar Temple Donation\n\nI want to donate ₹${currentAmount}\n\n📱 Account Holder: ${ACCOUNT_HOLDER}\n📱 Mobile: +91 ${TEMPLE_PHONE}\n\nPlease help me with payment instructions.\n\nThank you! 🙏`;
    const whatsappUrl = `https://wa.me/91${TEMPLE_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Copy UPI ID to clipboard
function copyUPI() {
    const upiText = TEMPLE_UPI;
    navigator.clipboard.writeText(upiText).then(() => {
        alert("✅ UPI ID copied to clipboard!\n\n" + upiText + "\n\nAccount Holder: " + ACCOUNT_HOLDER);
    }).catch(() => {
        alert("UPI ID: " + upiText + "\nAccount Holder: " + ACCOUNT_HOLDER);
    });
}

// Share payment details
function sharePaymentDetails() {
    const text = `🏛️ Sithambareswarar Temple, Mettupatti\n\nDonate Now! 💚\n\nAccount: ${ACCOUNT_HOLDER}\nMobile: +91 ${TEMPLE_PHONE}\nUPI ID: ${TEMPLE_UPI}\nAmount: ₹${currentAmount}\n\n🙏 Thank you for your generous donation!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Sithambareswarar Temple Donation',
            text: text
        });
    } else {
        alert(text);
    }
}

// Event listeners for amount buttons
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded - Donation system ready!");
    console.log("Temple UPI ID:", TEMPLE_UPI);
    console.log("Temple Phone:", TEMPLE_PHONE);
    console.log("Account Holder:", ACCOUNT_HOLDER);
});

// Alternative payment method - WhatsApp
function shareViaWhatsApp() {
    const message = `I want to donate ₹${currentAmount} to Sithambareswarar Temple.\n\nPayment details:\n📱 ${ACCOUNT_HOLDER}\n+91 ${TEMPLE_PHONE}\nUPI: ${TEMPLE_UPI}`;
    const whatsappUrl = `https://wa.me/91${TEMPLE_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Log donation for analytics (optional)
function logDonation(amount, method) {
    const timestamp = new Date().toLocaleString();
    console.log(`Donation logged - Amount: ₹${amount}, Method: ${method}, Time: ${timestamp}`);
    
    let donations = JSON.parse(localStorage.getItem('donations') || '[]');
    donations.push({
        amount: amount,
        method: method,
        timestamp: timestamp
    });
    localStorage.setItem('donations', JSON.stringify(donations));
}
