
export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    return this.model.create(data);
  }

  save(data) {
    return new this.model(data).save();
  }

  insertMany(data) {
    return this.model.insertMany(data);
  }

  findOne(filter = {}, projection = null, options = {}) {
    return this.model.findOne(filter, projection, options);
  }

  findById(id, projection = null, options = {}) {
    return this.model.findById(id, projection, options);
  }

  find(filter = {}, projection = null, options = {}) {
    return this.model.find(filter, projection, options);
  }

  updateById(id, update, options = {}) {
    return this.model.findByIdAndUpdate(id, update, { new: true, runValidators: true, ...options });
  }

  updateOne(filter, update, options = {}) {
    return this.model.findOneAndUpdate(filter, update, { new: true, runValidators: true, ...options });
  }

  updateMany(filter, update, options = {}) {
    return this.model.updateMany(filter, update, { runValidators: true, ...options });
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  deleteOne(filter) {
    return this.model.findOneAndDelete(filter);
  }

  deleteMany(filter) {
    return this.model.deleteMany(filter);
  }

  count(filter = {}) {
    return this.model.countDocuments(filter);
  }

  exists(filter) {
    return this.model.exists(filter);
  }
}
