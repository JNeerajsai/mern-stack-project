const Transaction = require('../models/Transaction');


// @desc get all transactions
// @route get /api/v1/transactions
// @access public

// Example handling HTTP request in transactions.js
exports.getTransactions = async (req, res, next) => {
    try {
      // Your logic to fetch transactions
      const transactions = await Transaction.find();
      return res.status(400).json({
        success: true,
        count: transactions.length,
        data: transactions
      });
      // Sending the response
// Use 'return' to prevent further execution
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  };
  


// @desc add transactions
// @route POST /api/v1/transactions
// @access public

exports.addTransactions =async (req, res, next) => {
    try{

    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
        success: true,
        data: transaction
    });
} catch (err) {
    if(err.name === 'ValidationError'){
        const messages = Object.values(err.errors).map(val => val.message);

        return res.status(400).json({
            success: false,
            error: messages
        });
    } else {
        return res.status(500).json({
            success: false,
            error: 'server Error'
        });
    }
}
}
// @desc  delete transactions
// @route DELETE /api/v1/transactions
// @access public

exports.deleteTransactions = async (req, res, next) => {
    try {
      const transaction = await Transaction.findById(req.params.id);
  
      if(!transaction) {
        return res.status(404).json({
          success: false,
          error: 'No transaction found'
        });
      }
  
      await transaction.remove();
  
      return res.status(200).json({
        success: true,
        data: {}
      });
  
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }