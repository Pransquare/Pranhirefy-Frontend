import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReleaseNoteById } from "../services/releaseNoteService";
import { FaArrowLeft, FaEdit, FaInfoCircle } from "react-icons/fa";

const ViewReleaseNote = () => {
  const { id } = useParams();

  const [note, setNote] = useState({
    fileName: "",
    releaseName: "",
    releaseVersion: "",
    releaseDate: "",
    status: "",
    uploadedPath: "",
    createdBy: "",
    modifiedBy: "",
    createdDate: "",
    modifiedDate: "",
  });

  useEffect(() => {
    getReleaseNoteById(id).then((res) => {
      const data = res.data;
      setNote({
        fileName: data.fileName || "",
        releaseName: data.releaseName || "",
        releaseVersion: data.releaseVersion || "",
        releaseDate: data.releaseDate || "",
        status: data.status || "",
        uploadedPath: data.uploadedPath || "",
        createdBy: data.createdBy || "",
        modifiedBy: data.modifiedBy || "",
        createdDate: data.createdDate || "",
        modifiedDate: data.modifiedDate || "",
      });
    });
  }, [id]);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-lg p-4">
          <h3 className="text-center text-primary mb-4 d-flex justify-content-center align-items-center">
            <FaInfoCircle className="me-2" />
            Release Note Details
          </h3>

          <div className="row row-cols-1 g-3">
            <div className="col">
              <div className="card border-left-primary shadow-sm">
                <div className="card-body">
                  <strong>File Name:</strong> {note.fileName}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card border-left-success shadow-sm">
                <div className="card-body">
                  <strong>Release Name:</strong> {note.releaseName}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card border-left-info shadow-sm">
                <div className="card-body">
                  <strong>Version:</strong> {note.releaseVersion}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card border-left-warning shadow-sm">
                <div className="card-body">
                  <strong>Release Date:</strong> {note.releaseDate}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card border-left-dark shadow-sm">
                <div className="card-body">
                  <strong>Status:</strong> {note.status}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card border-left-secondary shadow-sm">
                <div className="card-body">
                  <strong>Uploaded Path:</strong> {note.uploadedPath}
                </div>
              </div>
            </div>

            {/* New Fields Start */}
            <div className="col">
              <div className="card border-left-primary shadow-sm">
                <div className="card-body">
                  <strong>Created By:</strong> {note.createdBy}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card border-left-success shadow-sm">
                <div className="card-body">
                  <strong>Modified By:</strong> {note.modifiedBy}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card border-left-info shadow-sm">
                <div className="card-body">
                  <strong>Created Date:</strong> {note.createdDate}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card border-left-warning shadow-sm">
                <div className="card-body">
                  <strong>Modified Date:</strong> {note.modifiedDate}
                </div>
              </div>
            </div>
            {/* New Fields End */}
          </div>

          <div className="mt-4 d-flex justify-content-between">
            <Link to="/relaseNote" className="btn btn-outline-primary">
              <FaArrowLeft className="me-2" />
              Back to List
            </Link>
            <Link
              to={`/relaseNote/edit/${id}`}
              className="btn btn-outline-warning"
            >
              <FaEdit className="me-2" />
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReleaseNote;
