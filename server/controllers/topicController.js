const Topic = require('../models/topic');
const Article = require('../models/article');

// GET request for list of all Topic.

exports.topic_list = async (req, res, next) => {
  try {
    const topics = await Topic.find();
    return res.status(200).json({
      topics,
      message: {
        msgBody: 'topics succesfully fetched',
        msgError: false,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// GET request for one Topic.

exports.topic_detail = async (req, res, next) => {
  try {
    const topic = await Topic.findById({ _id: req.params.id });
    const articlesByTopic = await Article.find({
      topic: req.params.id,
    });
    if (!topic) {
      return res.status(404).json({
        message: { msgBody: 'Topic not found', msgError: true },
      });
    }
    return res.status(201).json({
      topic: {
        topic: topic,
        articles: articlesByTopic,
      },
      message: {
        msgBody: 'article succesfully created',
        msgError: false,
      },
    });
  } catch (error) {
    return next(error);
  }
};

//POST request for creating Topic.
exports.topic_create = async (req, res, next) => {
  try {
    const topic = new Topic({ name: req.body.name });
    const ReqTopic = await Topic.findOne({ name: req.body.name });
    if (ReqTopic) {
      return res.status(400).json({
        message: { msgBody: 'Topic already exist', msgError: true },
      });
    } else {
      await topic.save();
      return res.status(201).json({
        topic,
        message: {
          msgBody: 'topic succesfully created',
          msgError: false,
        },
      });
    }
  } catch (error) {
    return next(error);
  }
};
