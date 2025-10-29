const Application = require('../models/runnerapplication');
const Errand = require('../models/errand');
const User = require('../models/users');


exports.applyForErrand = async (req, res) => {
  try {
    const { errandId, bidPrice, message } = req.body;
    const runnerId = req.user.id; 

    const errand = await Errand.findByPk(errandId);
    if (!errand) {
      return res.status(404).json({ message: 'Errand not found' });
    }

    const existingApp = await Application.findOne({ where: { runnerId, errandId } });
    if (existingApp) {
      return res.status(400).json({ message: 'You already applied for this errand' });
    }

    const application = await Application.create({
      runnerId,
      errandId,
      message,
      bidPrice,
      status: 'Pending',
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.getErrandApplications = async (req, res) => {
  try {
    const { errandId } = req.params;
    const applications = await Application.findAll({
      where: { errandId },
      include: [{ model: User, as: 'runner', attributes: ['firstName', 'lastName', 'email'] }],
    });

    res.status(200).json({
      message: `Found ${applications.length} applications for this errand`,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await application.update({ status });

    res.status(200).json({
      message: `Application ${status.toLowerCase()} successfully`,
      data: application,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.getRunnerApplications = async (req, res) => {
  try {
    const runnerId = req.user.id;
    const applications = await Application.findAll({
      where: { runnerId },
      include: [{ model: Errand, as: 'errand' }],
    });

    res.status(200).json({
      message: 'Fetched runner applications successfully',
      data: applications,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
