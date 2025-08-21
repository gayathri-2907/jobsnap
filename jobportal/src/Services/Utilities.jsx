// Importing html2canvas
import html2canvas from 'html2canvas';

// Importing jsPDF
import { jsPDF } from 'jspdf';

import Template1 from "../Components/Resume/Templates/Template1";
import Template2 from "../Components/Resume/Templates/Template2";
import Template3 from "../Components/Resume/Templates/Template3";

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',  // Display year as full number
        month: 'short',   // Display month as abbreviated (e.g., Jan, Feb)
        day: 'numeric',   // Display day as number
    };
    return date.toLocaleString('en-US', options);

}

function timeAgo(time) {
    const now = new Date();
    const postedDate = new Date(time);
    const diff = now.getTime() - postedDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 60);
    const months = Math.floor(days / 30);

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 30) {
        return `${days} days ago`;
    } else {
        return `${months} months ago`;
    }
}

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) {
                resolve(reader.result);
            } else {
                reject("Failed to load image");
            }
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};
export { timeAgo, getBase64 };

export const formatInterviewTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
    });
}
export const openBase64PDF = (base64String) => {

    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const blobURL = URL.createObjectURL(blob);
    window.open(blobURL, "_blank");
}


export const downloadPDF = () => {
    const input = document.getElementById('order-summary');
    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('OrderDetails.pdf');
    });
};

export const templates = [
    {
        id: 1,
        template_name: "Template One",
        template_img: '/Assests/images/resume-one.jpg',
        template: <Template1 />,
    },
    {
        id: 2,
        template_name: "Template Two",
        template_img: '/Assests/images/resume-two.jpg',
        template: <Template2 />,
    },
    {
        id: 3,
        template_name: "Template Three",
        template_img: '/Assests/images/resume-three.png',
        template: <Template3 />,
    },
];
