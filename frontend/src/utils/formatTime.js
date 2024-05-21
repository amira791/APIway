export default function formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    // If more than 1 year, return years ago
    if (interval > 1) {
        return `${interval} years ago`;
    }

    // If less than 1 year but more than 12 months, return in months
    interval = Math.floor(seconds / 2592000);
    if (interval >= 12) {
        return `${Math.floor(interval / 12)} years ago`;
    }

    // If less than 12 months but more than 60 days, return in months
    if (interval > 2) {
        return `${interval} months ago`;
    }

    // If less than 2 months but more than 60 days, return in days
    interval = Math.floor(seconds / 86400);
    if (interval > 60) {
        return `${Math.floor(interval / 30)} months ago`;
    }

    // If less than 60 days but more than 1 day, return in days
    if (interval > 1) {
        return `${interval} days ago`;
    }

    // If less than 1 day but more than 1 hour, return in hours
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return `${interval} hours ago`;
    }

    // If less than 1 hour but more than 1 minute, return in minutes
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return `${interval} minutes ago`;
    }

    // If less than 1 minute, return in seconds
    return `${Math.floor(seconds)} seconds ago`;
}
