export function isAdmin (req, res, next) {
    if (!req.session?.isAdmin) {
        return res.status(403).json({ error: 'Forbidden' })
    }
    next();
}