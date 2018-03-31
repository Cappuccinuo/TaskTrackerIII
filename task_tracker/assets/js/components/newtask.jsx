import React from 'react';

export default function Newtask(params) {
  return (
    <form>
      <h2>New Task</h2>
      <div class="form-group">
        <label for="title">Title</label>
        <input class="form-control"/>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" rows="3"></textarea>
      </div>
      <div class="form-group">
          <label class="form-check-label" for="complete">
            Complete
          </label>
          <br />
          <input class="form-check-input" type="checkbox" value=""/>
      </div>
      <div class="form-group">
          <label class="form-check-label" for="complete">
            Time Spent
          </label>
          <input class="form-control" type="number" step="15" min="0"/>
      </div>
      <div class="form-group">
          <label class="form-check-label" for="complete">
            Assigned Worker
          </label>
          <input class="form-control" type="number" min="1"/>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  );
}
