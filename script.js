// Mobile number for donations
const TEMPLE_PHONE = "9443915395";
const TEMPLE_UPI = "9443915395@okaxis"; // UPI ID format

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
            <button onclick="payViaGPay()" class="payment-btn google-pay-btn">
                <span style="font-size: 24px;">🏦</span>
                <span>Google Pay</span>
            </button>
            
            <button onclick="payViaPhonePe()" class="payment-btn phonepe-btn">
                <span style="font-size: 24px;">📱</span>
                <span>PhonePe</span>
            </button>
            
            <button onclick="payViaUPI()" class="payment-btn upi-btn">
                <span style="font-size: 24px;">🔗</span>
                <span>Direct UPI</span>
            </button>
            
            <button onclick="showMobileNumberPayment()" class="payment-btn mobile-btn">
                <span style="font-size: 24px;">📞</span>
                <span>Mobile Number</span>
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
    
    // Google Pay UPI scheme
    const upiString = `upi://pay?pa=${TEMPLE_UPI}&pn=Sithambareswarar%20Temple%20Mettupatti&am=${currentAmount}&tn=Donation%20to%20Temple&tr=${generateTransactionId()}`;
    
    console.log("Initiating Google Pay payment...");
    console.log("UPI String:", upiString);
    
    // Try to open the UPI link
    window.location.href = upiString;
    
    // Fallback: Show the mobile number
    setTimeout(() => {
        showMobileNumberPayment();
    }, 1500);
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
    }, 1500);
}

// Pay via Direct UPI
function payViaUPI() {
    if (currentAmount <= 0) {
        alert("Please select an amount first!");
        return;
    }
    
    // Standard UPI scheme
    const upiString = `upi://pay?pa=${TEMPLE_UPI}&pn=Sithambareswarar%20Temple%20Mettupatti&am=${currentAmount}&tn=Donation%20to%20Temple&tr=${generateTransactionId()}`;
    
    console.log("Initiating UPI payment...");
    console.log("UPI String:", upiString);
    
    window.location.href = upiString;
    
    // Fallback
    setTimeout(() => {
        showMobileNumberPayment();
    }, 1500);
}

// Generate unique transaction ID
function generateTransactionId() {
    return "TEMPLE" + Math.floor(Math.random() * 1000000000);
}

// Show mobile number payment option
function showMobileNumberPayment() {
    const modal = document.getElementById("donationModal");
    const modalContent = modal.querySelector(".modal-content");
    
    const mobilePaymentHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>📱 Send Money via Mobile Number</h2>
        <p style="text-align: center; color: #666; margin-bottom: 1.5rem;">Send ₹${currentAmount} to:</p>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 10px; margin: 1.5rem 0; text-align: center;">
            <p style="color: white; font-size: 14px; margin-bottom: 0.5rem;">Temple Contact Number</p>
            <p style="color: white; font-size: 32px; font-weight: bold; margin: 0.5rem 0;">+91 ${TEMPLE_PHONE}</p>
        </div>
        
        <div style="background: #e8f4f8; padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0; text-align: left;">
            <h3 style="margin-top: 0; color: #333;">Steps to pay:</h3>
            <ol style="padding-left: 1.5rem;">
                <li><strong>Open Google Pay / PhonePe app</strong></li>
                <li><strong>Tap "Send Money" option</strong></li>
                <li><strong>Enter mobile number:</strong> <span style="color: #667eea; font-weight: bold;">+91 ${TEMPLE_PHONE}</span></li>
                <li><strong>Enter amount:</strong> <span style="color: #764ba2; font-weight: bold;">₹${currentAmount}</span></li>
                <li><strong>Complete the payment</strong></li>
            </ol>
        </div>
        
        <div style="background: #fff3cd; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404;"><strong>💡 Tip:</strong> Make sure you use "Send Money" option, not "Request Money"</p>
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
        <h2>📖 Manual Payment Instructions</h2>
        
        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0;">
            <h3 style="color: #333; margin-top: 0;">Payment Methods Available:</h3>
            
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 8px; border-left: 4px solid #667eea;">
                <h4 style="margin-top: 0; color: #667eea;">🏦 Via UPI ID</h4>
                <p style="margin: 0.5rem 0;"><strong>UPI ID:</strong></p>
                <p style="background: #f0f0f0; padding: 0.8rem; border-radius: 5px; text-align: center; font-weight: bold; color: #667eea; margin: 0.5rem 0;">
                    ${TEMPLE_UPI}
                </p>
                <p style="font-size: 13px; color: #666; margin: 0.5rem 0;">Use this with Google Pay, PhonePe, or any UPI app</p>
            </div>
            
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 8px; border-left: 4px solid #764ba2;">
                <h4 style="margin-top: 0; color: #764ba2;">📱 Via Mobile Number</h4>
                <p style="margin: 0.5rem 0;"><strong>Mobile Number:</strong></p>
                <p style="background: #f0f0f0; padding: 0.8rem; border-radius: 5px; text-align: center; font-weight: bold; color: #764ba2; margin: 0.5rem 0;">
                    +91 ${TEMPLE_PHONE}
                </p>
                <p style="font-size: 13px; color: #666; margin: 0.5rem 0;">Send money directly using "Send Money" feature in Google Pay or PhonePe</p>
            </div>
            
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 8px; border-left: 4px solid #25D366;">
                <h4 style="margin-top: 0; color: #25D366;">💬 Via WhatsApp</h4>
                <p style="font-size: 13px; color: #666; margin: 0.5rem 0;">Contact us on WhatsApp to arrange payment: +91 ${TEMPLE_PHONE}</p>
            </div>
        </div>
        
        <div style="background: #e8f5e9; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #4caf50;">
            <p style="margin: 0; color: #2e7d32;"><strong>✅ Amount to pay: ₹${currentAmount}</strong></p>
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
        alert("✅ Phone number copied to clipboard!\n\n" + phoneText);
    }).catch(() => {
        alert("Phone Number: " + phoneText);
    });
}

// Share phone number via WhatsApp
function sharePhoneViaWhatsApp() {
    const message = `🏛️ Sithambareswarar Temple Donation\n\nI want to donate ₹${currentAmount}\n\nPlease send me payment instructions to:\n📱 +91 ${TEMPLE_PHONE}\n\nThank you! 🙏`;
    const whatsappUrl = `https://wa.me/91${TEMPLE_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Copy UPI ID to clipboard
function copyUPI() {
    const upiText = TEMPLE_UPI;
    navigator.clipboard.writeText(upiText).then(() => {
        alert("✅ UPI ID copied to clipboard!\n\n" + upiText);
    }).catch(() => {
        alert("UPI ID: " + upiText);
    });
}

// Share payment details
function sharePaymentDetails() {
    const text = `🏛️ Sithambareswarar Temple, Mettupatti\n\nDonate Now! 💚\n\nUPI ID: ${TEMPLE_UPI}\nMobile: +91 ${TEMPLE_PHONE}\nAmount: ₹${currentAmount}\n\n🙏 Thank you for your generous donation!`;
    
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
});

// Alternative payment method - WhatsApp
function shareViaWhatsApp() {
    const message = `I want to donate ₹${currentAmount} to Sithambareswarar Temple. Please accept my donation via Google Pay/PhonePe: ${TEMPLE_UPI} or ${TEMPLE_PHONE}`;
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
