import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 150,                  // Limit each IP to 100 requests per windowMs
    standardHeaders: true,     // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,      // Disable `X-RateLimit-*` headers
    message: "Too many requests from this IP, please try again later",
});

export const loginLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 4,                  // Limit each IP to 100 requests per windowMs
    standardHeaders: true,     // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,      // Disable `X-RateLimit-*` headers
    message: "Too many Login attempts, please try again later!"
})