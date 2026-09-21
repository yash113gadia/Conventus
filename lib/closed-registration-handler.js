export default function closedRegistrationHandler(req, res) {
  return res.status(410).json({
    error: 'CMUN Connect has concluded and registrations are closed.',
  });
}
