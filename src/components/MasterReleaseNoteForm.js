import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createReleaseNote,
  getReleaseNoteById,
  updateReleaseNote,
} from "././services/releaseNotesService";

const MasterReleaseNotesForm = () => {
  const [note, setNote] = useState({
    fileName: "",
    releaseName: "",
    releaseVersion: "",
    releaseDate: "",
    status: "",
    uploadedPath: "",
    createdBy: "",
    modifiedBy: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getReleaseNoteById(id).then((res) => {
        const { fileName, releaseName, releaseVersion, releaseDate, status, uploadedPath, createdBy, modifiedBy } = res.data;
        setNote({
          fileName,
          releaseName,
          releaseVersion,
          releaseDate,
          status,
          uploadedPath,
          createdBy,
          modifiedBy,
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateReleaseNote(id, note); // Backend auto-handles modifiedBy and modifiedDate
    } else {
      await createReleaseNote(note); // Backend auto-handles createdBy and createdDate
    }
    navigate("/releaseNote");
  };

  const handleCancel = () => {
    navigate("/releaseNote");
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit" : "Add"} Release Note</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="fileName" className="form-label">File Name</label>
          <input
            id="fileName"
            name="fileName"
            className="form-control"
            placeholder="Enter File Name"
            value={note.fileName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="releaseName" className="form-label">Release Name</label>
          <input
            id="releaseName"
            name="releaseName"
            className="form-control"
            placeholder="Enter Release Name"
            value={note.releaseName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="releaseVersion" className="form-label">Release Version</label>
          <input
            id="releaseVersion"
            name="releaseVersion"
            className="form-control"
            placeholder="Enter Version"
            value={note.releaseVersion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="releaseDate" className="form-label">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            className="form-control"
            value={note.releaseDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <input
            id="status"
            name="status"
            className="form-control"
            placeholder="Enter Status"
            value={note.status}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="uploadedPath" className="form-label">Upload File</label>
          <input
            type="file"
            id="uploadedPath"
            name="uploadedPath"
            className="form-control"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setNote({ ...note, uploadedPath: file.name });
              }
            }}
          />
          {note.uploadedPath && (
            <small className="text-muted mt-1">
              Selected File: <strong>{note.uploadedPath}</strong>
            </small>
          )}
        </div>

        {!id && (
          <div className="mb-3">
            <label htmlFor="createdBy" className="form-label">Created By</label>
            <input
              id="createdBy"
              name="createdBy"
              className="form-control"
              value={note.createdBy}
              onChange={handleChange}
            />
          </div>
        )}

        {id && (
          <div className="mb-3">
            <label htmlFor="modifiedBy" className="form-label">Modified By</label>
            <input
              id="modifiedBy"
              name="modifiedBy"
              className="form-control"
              value={note.modifiedBy}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Dates are hidden — handled automatically by backend */}

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            {id ? "Update" : "Submit"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MasterReleaseNotesForm;
