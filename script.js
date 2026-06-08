// Mobile number for donations
const TEMPLE_PHONE = "8870782080";
const TEMPLE_UPI = "8870782080@okaxis"; // UPI ID format

// Set current donation amount
let currentAmount = 0;

// Show donation modal
function showDonateOptions() {
    const modal = document.getElementById("donationModal");
    if (modal) {
        modal.style.display = "block";
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
        showPaymentFallback();
    }, 1000);
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
        showPaymentFallback();
    }, 1000);
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
        showPaymentFallback();
    }, 1000);
}

// Generate unique transaction ID
function generateTransactionId() {
    return "TEMPLE" + Math.floor(Math.random() * 1000000000);
}

// Show payment fallback with manual transfer instructions
function showPaymentFallback() {
    const modal = document.getElementById("donationModal");
    const modalContent = modal.querySelector(".modal-content");
    
    const fallbackHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>📱 Complete Your Donation</h2>
        <p>If the payment app didn't open, please follow these steps:</p>
        <div style="background: #ffe4b5; padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0; text-align: left;">
            <p style="margin-bottom: 1rem;"><strong>1. Open Google Pay or PhonePe app on your phone</strong></p>
            <p style="margin-bottom: 1rem;"><strong>2. Tap "Send Money" or "Pay UPI"</strong></p>
            <p style="margin-bottom: 1rem;"><strong>3. Enter this UPI ID:</strong></p>
            <p style="background: white; padding: 0.8rem; border-radius: 5px; text-align: center; font-weight: bold; color: #FF8C00; margin-bottom: 1rem;">
                ${TEMPLE_UPI}
            </p>
            <p style="margin-bottom: 1rem;"><strong>4. Or call and send money to this mobile number:</strong></p>
            <p style="background: white; padding: 0.8rem; border-radius: 5px; text-align: center; font-weight: bold; color: #8B4513; margin-bottom: 1rem;">
                📞 +91 ${TEMPLE_PHONE}
            </p>
            <p style="margin-bottom: 1rem;"><strong>5. Amount to send: ₹${currentAmount}</strong></p>
            <p style="background: #fff9e6; padding: 0.8rem; border-radius: 5px; border-left: 4px solid #FFD700;">
                🙏 <strong>Thank you for your generous donation to Sithambareswarar Temple!</strong>
            </p>
        </div>
        <button onclick="copyUPI()" style="width: 100%; padding: 0.8rem; background: linear-gradient(135deg, #FFD700, #FF8C00); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 1rem;">
            📋 Copy UPI ID
        </button>
        <button onclick="sharePaymentDetails()" style="width: 100%; padding: 0.8rem; background: linear-gradient(135deg, #8B4513, #A0522D); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 0.5rem;">
            📤 Share Details
        </button>
    `;
    
    modalContent.innerHTML = fallbackHTML;
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
