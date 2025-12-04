import User from "../model/user.model";
import Event from "../model/event.model";
import Booking from "../model/booking.model";
import Review from "../model/review.model";

export async function seedDatabase() {
    const userCount = await User.countDocuments();

    // Nếu đã có dữ liệu rồi thì bỏ qua (tránh insert trùng)
    if (userCount > 0) {
        console.log("Seed data detected → skip seeding.");
        return;
    }

    console.log("Seeding database...");

    // ========== 1. USERS ==========
    const [
        customerA,
        customerB,
        customerC,
        organizerEventCorp,
        organizerMusicLive,
        organizerDesignStudio,
        adminUser,
    ] = await User.insertMany([
        {
            name: "Nguyen Van A",
            email: "a@example.com",
            phone: "0901000001",
            role: "customer",
            createdAt: new Date("2025-01-01T10:00:00Z"),
        },
        {
            name: "Tran Thi B",
            email: "b@example.com",
            phone: "0901000002",
            role: "customer",
            createdAt: new Date("2025-01-02T11:00:00Z"),
        },
        {
            name: "Le Van C",
            email: "c@example.com",
            phone: "0901000006",
            role: "customer",
            createdAt: new Date("2025-01-03T12:00:00Z"),
        },
        {
            name: "Event Corp",
            email: "organizer1@example.com",
            phone: "0901000003",
            role: "organizer",
            createdAt: new Date("2025-01-03T09:00:00Z"),
        },
        {
            name: "Music Live Co",
            email: "organizer2@example.com",
            phone: "0901000004",
            role: "organizer",
            createdAt: new Date("2025-01-04T09:00:00Z"),
        },
        {
            name: "Design Studio",
            email: "organizer3@example.com",
            phone: "0901000007",
            role: "organizer",
            createdAt: new Date("2025-01-05T09:00:00Z"),
        },
        {
            name: "Admin User",
            email: "admin@example.com",
            phone: "0901000005",
            role: "admin",
            createdAt: new Date("2025-01-01T08:00:00Z"),
        },
    ]);

    // ========== 2. EVENTS ==========
    const [
        rockConcert,
        nodeWorkshop,
        comedyNight,
        uxWorkshop,
        acousticSession,
    ] = await Event.insertMany([
        {
            title: "Rock Concert 2025",
            category: "concert",
            organizerId: organizerMusicLive._id,
            startTime: new Date("2025-02-10T18:30:00Z"),
            endTime: new Date("2025-02-10T21:30:00Z"),
            price: 500_000,
            tags: ["music", "live", "rock"],
            venue: {
                name: "Saigon Music Hall",
                city: "Ho Chi Minh",
                address: "01 Le Loi, District 1",
                capacity: 2000,
            },
            stats: {
                totalTickets: 2000,
                soldTickets: 850,
            },
            createdAt: new Date("2025-01-05T10:00:00Z"),
        },
        {
            title: "Node.js for Beginners",
            category: "workshop",
            organizerId: organizerEventCorp._id,
            startTime: new Date("2025-03-01T09:00:00Z"),
            endTime: new Date("2025-03-01T12:00:00Z"),
            price: 300_000,
            tags: ["programming", "nodejs", "developer"],
            venue: {
                name: "Tech Space",
                city: "Ho Chi Minh",
                address: "100 Nguyen Thi Minh Khai, District 3",
                capacity: 100,
            },
            stats: {
                totalTickets: 100,
                soldTickets: 60,
            },
            createdAt: new Date("2025-01-06T10:00:00Z"),
        },
        {
            title: "Stand-up Comedy Night",
            category: "theater",
            organizerId: organizerEventCorp._id,
            startTime: new Date("2025-02-20T19:00:00Z"),
            endTime: new Date("2025-02-20T21:00:00Z"),
            price: 250_000,
            tags: ["comedy", "fun"],
            venue: {
                name: "Hanoi Funny Club",
                city: "Ha Noi",
                address: "20 Tran Hung Dao, Hoan Kiem",
                capacity: 300,
            },
            stats: {
                totalTickets: 300,
                soldTickets: 200,
            },
            createdAt: new Date("2025-01-07T10:00:00Z"),
        },
        {
            title: "UX Design Workshop",
            category: "workshop",
            organizerId: organizerDesignStudio._id,
            startTime: new Date("2025-03-15T09:00:00Z"),
            endTime: new Date("2025-03-15T17:00:00Z"),
            price: 700_000,
            tags: ["design", "ux"],
            venue: {
                name: "Design Hub",
                city: "Ho Chi Minh",
                address: "50 Vo Thi Sau, District 1",
                capacity: 60,
            },
            stats: {
                totalTickets: 60,
                soldTickets: 45,
            },
            createdAt: new Date("2025-01-08T10:00:00Z"),
        },
        {
            title: "Indie Acoustic Session",
            category: "concert",
            organizerId: organizerMusicLive._id,
            startTime: new Date("2025-02-28T19:30:00Z"),
            endTime: new Date("2025-02-28T21:00:00Z"),
            price: 200_000,
            tags: ["music", "acoustic", "indie"],
            venue: {
                name: "Da Nang Art Cafe",
                city: "Da Nang",
                address: "12 Bach Dang",
                capacity: 120,
            },
            stats: {
                totalTickets: 120,
                soldTickets: 80,
            },
            createdAt: new Date("2025-01-09T10:00:00Z"),
        },
    ]);

    // ========== 3. BOOKINGS ==========
    await Booking.insertMany([
        // A – Rock Concert, VIP
        {
            userId: customerA._id,
            eventId: rockConcert._id,
            status: "paid",
            tickets: [{ seatType: "VIP", quantity: 2, unitPrice: 800_000 }],
            totalAmount: 1_600_000,
            paymentMethod: "momo",
            createdAt: new Date("2025-01-10T09:00:00Z"),
        },
        // B – Rock Concert, NORMAL
        {
            userId: customerB._id,
            eventId: rockConcert._id,
            status: "paid",
            tickets: [{ seatType: "NORMAL", quantity: 3, unitPrice: 500_000 }],
            totalAmount: 1_500_000,
            paymentMethod: "credit_card",
            createdAt: new Date("2025-01-11T10:00:00Z"),
        },
        // C – Rock Concert, mix NORMAL (thay Standard + Student -> NORMAL)
        {
            userId: customerC._id,
            eventId: rockConcert._id,
            status: "pending",
            tickets: [
                { seatType: "NORMAL", quantity: 1, unitPrice: 500_000 },
                { seatType: "NORMAL", quantity: 1, unitPrice: 300_000 },
            ],
            totalAmount: 800_000,
            paymentMethod: "cash",
            createdAt: new Date("2025-01-12T09:30:00Z"),
        },
        // A – Node.js Workshop
        {
            userId: customerA._id,
            eventId: nodeWorkshop._id,
            status: "paid",
            tickets: [{ seatType: "NORMAL", quantity: 1, unitPrice: 300_000 }],
            totalAmount: 300_000,
            paymentMethod: "cash",
            createdAt: new Date("2025-01-13T11:00:00Z"),
        },
        // B – Node.js Workshop (cancelled)
        {
            userId: customerB._id,
            eventId: nodeWorkshop._id,
            status: "cancelled",
            tickets: [{ seatType: "NORMAL", quantity: 2, unitPrice: 300_000 }],
            totalAmount: 600_000,
            paymentMethod: "momo",
            createdAt: new Date("2025-01-14T11:30:00Z"),
        },
        // B – Comedy Night
        {
            userId: customerB._id,
            eventId: comedyNight._id,
            status: "paid",
            tickets: [
                { seatType: "NORMAL", quantity: 2, unitPrice: 250_000 },
                { seatType: "NORMAL", quantity: 1, unitPrice: 150_000 },
            ],
            totalAmount: 650_000,
            paymentMethod: "momo",
            createdAt: new Date("2025-01-15T12:00:00Z"),
        },
        // C – UX Workshop
        {
            userId: customerC._id,
            eventId: uxWorkshop._id,
            status: "paid",
            tickets: [{ seatType: "NORMAL", quantity: 1, unitPrice: 700_000 }],
            totalAmount: 700_000,
            paymentMethod: "credit_card",
            createdAt: new Date("2025-01-16T09:15:00Z"),
        },
        // A – Indie Acoustic Session
        {
            userId: customerA._id,
            eventId: acousticSession._id,
            status: "paid",
            tickets: [{ seatType: "NORMAL", quantity: 2, unitPrice: 200_000 }],
            totalAmount: 400_000,
            paymentMethod: "momo",
            createdAt: new Date("2025-01-17T20:00:00Z"),
        },
    ]);

    // ========== 4. REVIEWS ==========
    await Review.insertMany([
        {
            userId: customerA._id,
            eventId: rockConcert._id,
            rating: 5,
            comment: "Show rock rất cháy, âm thanh tốt!",
            createdAt: new Date("2025-02-11T10:00:00Z"),
        },
        {
            userId: customerB._id,
            eventId: rockConcert._id,
            rating: 4,
            comment: "Không khí vui nhưng xếp chỗ hơi lộn xộn.",
            createdAt: new Date("2025-02-11T11:00:00Z"),
        },
        {
            userId: customerC._id,
            eventId: rockConcert._id,
            rating: 3,
            comment: "Nhạc hay nhưng ánh sáng hơi chói.",
            createdAt: new Date("2025-02-11T12:00:00Z"),
        },
        {
            userId: customerA._id,
            eventId: nodeWorkshop._id,
            rating: 5,
            comment: "Workshop Node.js dễ hiểu, ví dụ thực tế.",
            createdAt: new Date("2025-03-02T09:30:00Z"),
        },
        {
            userId: customerB._id,
            eventId: comedyNight._id,
            rating: 4,
            comment: "Hài khá duyên, có vài đoạn hơi nhạt.",
            createdAt: new Date("2025-02-21T09:00:00Z"),
        },
        {
            userId: customerC._id,
            eventId: uxWorkshop._id,
            rating: 5,
            comment: "UX workshop rất bổ ích, có nhiều bài tập thực hành.",
            createdAt: new Date("2025-03-16T09:00:00Z"),
        },
    ]);

    console.log("Seeding completed.");
}
