// import { useState } from "react";
// import { uploadDocument, getDocumentStatus } from "../api/documentsApi";
// import { useDocuments } from "../context/DocumentsContext";

// const Documents = () => {
//   const { addDocument, updateDocumentStatus } = useDocuments();
//   const [files, setFiles] = useState([]);
//   const [dragActive, setDragActive] = useState(false);

//   const handleUpload = async (file) => {
//     const tempId = Date.now();

//     const newFile = {
//       localId: tempId,
//       name: file.name,
//       status: "Uploading",
//       progress: 20,
//       docId: null,
//     };

//     setFiles((prev) => [...prev, newFile]);

//     try {
//       const response = await uploadDocument(file);
//       const docId = response.doc_id;

//       updateFile(tempId, {
//         status: "Processing",
//         progress: 60,
//         docId,
//       });

//       pollStatus(docId, tempId);

//     } catch (error) {
//       updateFile(tempId, {
//         status: "Failed",
//         progress: 100,
//       });
//     }
//   };

//   const pollStatus = (docId, localId) => {
//     const interval = setInterval(async () => {
//       try {
//         const statusRes = await getDocumentStatus(docId);

//         const status = statusRes.status?.toLowerCase();

//         if (status === "processed" || status === "indexed") {
//           updateFile(localId, {
//             status: "Indexed",
//             progress: 100,
//           });
//           clearInterval(interval);
//         } else if (status === "failed") {
//           updateFile(localId, {
//             status: "Failed",
//             progress: 100,
//           });
//           clearInterval(interval);
//         }
//       } catch (err) {
//         clearInterval(interval);
//       }
//     }, 3000);
//   };

//   const updateFile = (localId, updates) => {
//     setFiles((prev) =>
//       prev.map((file) =>
//         file.localId === localId
//           ? { ...file, ...updates }
//           : file
//       )
//     );
//   };

//   const handleFiles = (fileList) => {
//     const file = fileList[0];
//     if (!file) return;
//     handleUpload(file);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragActive(false);
//     handleFiles(e.dataTransfer.files);
//   };

//   return (
//     <div className="text-white p-8">
//       <h1 className="text-3xl font-bold mb-8">
//         Document Ingestion Hub
//       </h1>

//       {/* Premium Drag Drop Zone */}
//       <div
//         onDragOver={(e) => {
//           e.preventDefault();
//           setDragActive(true);
//         }}
//         onDragLeave={() => setDragActive(false)}
//         onDrop={handleDrop}
//         className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all ${
//           dragActive
//             ? "border-primary bg-gray-900 scale-105"
//             : "border-gray-600 bg-gray-900"
//         }`}
//       >
//         <p className="text-xl mb-2">
//           Drag & Drop PDF here
//         </p>
//         <p className="text-gray-400 mb-4">
//           or
//         </p>

//         <label className="bg-primary px-6 py-2 rounded-xl cursor-pointer hover:bg-red-700 transition">
//           Browse File
//           <input
//             type="file"
//             accept=".pdf"
//             hidden
//             onChange={(e) => handleFiles(e.target.files)}
//           />
//         </label>
//       </div>

//       {/* File List */}
//       <div className="mt-10 space-y-6">
//         {files.map((file) => (
//           <div
//             key={file.localId}
//             className="bg-gray-900 p-6 rounded-2xl shadow-lg"
//           >
//             <div className="flex justify-between items-center mb-3">
//               <span className="font-semibold">
//                 {file.name}
//               </span>

//               <StatusBadge status={file.status} />
//             </div>

//             {/* Progress Bar */}
//             <div className="w-full bg-gray-700 rounded-full h-2">
//               <div
//                 className={`h-2 rounded-full transition-all duration-500 ${
//                   file.status === "Failed"
//                     ? "bg-red-500"
//                     : file.status === "Indexed"
//                     ? "bg-green-500"
//                     : "bg-primary"
//                 }`}
//                 style={{ width: `${file.progress}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const StatusBadge = ({ status }) => {
//   const base =
//     "px-3 py-1 rounded-full text-xs font-semibold";

//   if (status === "Uploading")
//     return (
//       <span className={`${base} bg-blue-500`}>
//         Uploading
//       </span>
//     );

//   if (status === "Processing")
//     return (
//       <span className={`${base} bg-yellow-500`}>
//         Processing
//       </span>
//     );

//   if (status === "Indexed")
//     return (
//       <span className={`${base} bg-green-500`}>
//         Indexed
//       </span>
//     );

//   return (
//     <span className={`${base} bg-red-500`}>
//       Failed
//     </span>
//   );
// };

// export default Documents;




// import { useState } from "react";
// import { uploadDocument, getDocumentStatus } from "../api/documentsApi";
// import { useDocuments } from "../context/DocumentsContext";

// const Documents = () => {
//   const { addDocument, updateDocumentStatus } = useDocuments();

//   const [files, setFiles] = useState([]);
//   const [dragActive, setDragActive] = useState(false);

//   const handleUpload = async (file) => {
//     const tempId = Date.now();

//     const newFile = {
//       localId: tempId,
//       name: file.name,
//       status: "Uploaded",
//       progress: 80,
//       docId: null,
//     };

//     setFiles((prev) => [...prev, newFile]);

//     try {
//     //   const response = await uploadDocument(file);
//     //   const docId = response.doc_id;

//     //   // Add to global context
//     //   addDocument({
//     //     docId,
//     //     name: file.name,
//     //     status: "Processing",
//     //   });

//     //   updateFile(tempId, {
//     //     status: "Processing",
//     //     progress: 60,
//     //     docId,
//     //   });

//     //   pollStatus(docId, tempId);
//     const response = await uploadDocument(file);

// console.log("UPLOAD RESPONSE:", response);

// // safer extraction
// const docId = response.data?.doc_id;

// if (!docId) {
//   console.error("docId is undefined");
//   return;
// }

//     } catch (error) {
//       updateFile(tempId, {
//         status: "Failed",
//         progress: 100,
//       });
//     }
//   };

//   const pollStatus = (docId, localId) => {
//     const interval = setInterval(async () => {
//       try {
//         const statusRes = await getDocumentStatus(docId);
//         const status = statusRes.status?.toLowerCase();

//         if (
//           status === "Processed" ||
//           status === "indexed" ||
//           status === "completed"
//         ) {
//           updateFile(localId, {
//             status: "Indexed",
//             progress: 100,
//           });

//           // Update global context
//           updateDocumentStatus(docId, "Indexed");

//           clearInterval(interval);
//         } 
//         else if (status === "failed") {
//           updateFile(localId, {
//             status: "Failed",
//             progress: 100,
//           });

//           updateDocumentStatus(docId, "Failed");

//           clearInterval(interval);
//         }
//       } catch (err) {
//         clearInterval(interval);
//       }
//     }, 3000);
//   };

//   const updateFile = (localId, updates) => {
//     setFiles((prev) =>
//       prev.map((file) =>
//         file.localId === localId
//           ? { ...file, ...updates }
//           : file
//       )
//     );
//   };

//   const handleFiles = (fileList) => {
//     const file = fileList[0];
//     if (!file) return;
//     handleUpload(file);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragActive(false);
//     handleFiles(e.dataTransfer.files);
//   };

//   return (
//     <div className="text-white p-8">
//       <h1 className="text-3xl font-bold mb-8">
//         Document Ingestion Hub
//       </h1>

//       {/* Drag & Drop Zone */}
//       <div
//         onDragOver={(e) => {
//           e.preventDefault();
//           setDragActive(true);
//         }}
//         onDragLeave={() => setDragActive(false)}
//         onDrop={handleDrop}
//         className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all ${
//           dragActive
//             ? "border-primary bg-gray-900 scale-105"
//             : "border-gray-600 bg-gray-900"
//         }`}
//       >
//         <p className="text-xl mb-2">
//           Drag & Drop PDF here
//         </p>
//         <p className="text-gray-400 mb-4">or</p>

//         <label className="bg-primary px-6 py-2 rounded-xl cursor-pointer hover:bg-red-700 transition">
//           Browse File
//           <input
//             type="file"
//             accept=".pdf"
//             hidden
//             onChange={(e) => handleFiles(e.target.files)}
//           />
//         </label>
//       </div>

//       {/* File List */}
//       <div className="mt-10 space-y-6">
//         {files.map((file) => (
//           <div
//             key={file.localId}
//             className="bg-gray-900 p-6 rounded-2xl shadow-lg"
//           >
//             <div className="flex justify-between items-center mb-3">
//               <span className="font-semibold">
//                 {file.name}
//               </span>

//               <StatusBadge status={file.status} />
//             </div>

//             <div className="w-full bg-gray-700 rounded-full h-2">
//               <div
//                 className={`h-2 rounded-full transition-all duration-500 ${
//                   file.status === "Failed"
//                     ? "bg-red-500"
//                     : file.status === "Indexed"
//                     ? "bg-green-500"
//                     : "bg-primary"
//                 }`}
//                 style={{ width: `${file.progress}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const StatusBadge = ({ status }) => {
//   const base = "px-3 py-1 rounded-full text-xs font-semibold";

//   if (status === "Uploading")
//     return <span className={`${base} bg-blue-500`}>Uploading</span>;

//   if (status === "Processing")
//     return <span className={`${base} bg-yellow-500`}>Processing</span>;

//   if (status === "Indexed")
//     return <span className={`${base} bg-green-500`}>Indexed</span>;

//   return <span className={`${base} bg-red-500`}>Failed</span>;
// };

// export default Documents;




import { useState, useEffect, useRef } from "react";
import { uploadDocument, getDocumentStatus, listDocuments } from "../api/documentsApi";
import { useDocuments } from "../context/DocumentsContext";

const Documents = () => {
  const { addDocument, updateDocumentStatus } = useDocuments();

  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [allDocuments, setAllDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const isInitialLoad = useRef(true);

  // Fetch all documents on component mount and after uploads
  useEffect(() => {
    const fetchDocuments = async () => {
      // Only show loading on initial load
      if (isInitialLoad.current) {
        setLoadingDocuments(true);
      }
      try {
        const response = await listDocuments();
        console.log("DOCUMENTS LIST:", response);
        setAllDocuments(response.data?.documents || []);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoadingDocuments(false);
        isInitialLoad.current = false;
      }
    };

    fetchDocuments();
    // Refresh documents every 10 seconds (silent refresh after initial load)
    const interval = setInterval(fetchDocuments, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleUpload = async (file) => {
    const tempId = Date.now();

    // 1️⃣ Initially show uploading
    const newFile = {
      localId: tempId,
      name: file.name,
      status: "Uploading",
      progress: 20,
      docId: null,
    };

    setFiles((prev) => [...prev, newFile]);

    try {
      const response = await uploadDocument(file);

      console.log("UPLOAD RESPONSE:", response);

      const docId = response.data?.doc_id;

      if (!docId) {
        throw new Error("docId missing from response");
      }

      // 2️⃣ After upload success
      updateFile(tempId, {
        status: "Processing",
        progress: 50,
        docId,
      });

      // Add to global context
      addDocument({
        docId,
        name: file.name,
        status: "Processing",
      });

      // 3️⃣ Start polling
      pollStatus(docId, tempId);
    } catch (error) {
      console.error("Upload error:", error);

      updateFile(tempId, {
        status: "Failed",
        progress: 100,
      });
    }
  };

  const pollStatus = (docId, localId) => {
    let pollCount = 0;
    const maxAttempts = 120; // Stop polling after 2 minutes (120 * 1 second)
    
    const interval = setInterval(async () => {
      pollCount++;
      try {
        const statusRes = await getDocumentStatus(docId);

        console.log("STATUS RESPONSE:", statusRes);
        
        // Handle response structure: statusRes = {status: "success", data: {status: "...", ...}}
        const taskData = statusRes?.data;
        const taskStatus = taskData?.status;
        const status = taskStatus?.toLowerCase();
        const progress = taskData?.progress || "";

        console.log(`[${pollCount}] Polling status for ${docId}: ${status} - ${progress}`);

        if (
          status === "indexed" ||
          status === "processed" ||
          status === "completed"
        ) {
          updateFile(localId, {
            status: "Indexed",
            progress: 100,
          });

          updateDocumentStatus(docId, "Indexed");

          console.log(`✅ Document ${docId} completed!`);
          clearInterval(interval);
        } else if (status === "failed") {
          updateFile(localId, {
            status: "Failed",
            progress: 100,
          });

          updateDocumentStatus(docId, "Failed");

          console.log(`❌ Document ${docId} failed! Error: ${taskData?.error}`);
          clearInterval(interval);
        } else {
          // Still processing - update progress with details
          updateFile(localId, {
            status: "Processing",
            progress: Math.min(30 + (pollCount * 0.5), 95),
            detail: progress, // Show backend progress
          });
        }
      } catch (err) {
        console.error("Polling error:", err);
        // Don't stop polling on error - try again
      }

      // Stop polling after max attempts
      if (pollCount >= maxAttempts) {
        console.warn(`Polling timeout for document ${docId}`);
        clearInterval(interval);
        updateFile(localId, {
          status: "Failed",
          progress: 100,
          detail: "Processing timeout - took too long",
        });
      }
    }, 1000); // Poll every 1 second instead of 3 for faster updates
  };

  const updateFile = (localId, updates) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.localId === localId ? { ...file, ...updates } : file
      )
    );
  };

  const handleFiles = (fileList) => {
    const file = fileList[0];
    if (!file) return;
    handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Document Ingestion Hub</h1>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all ${
          dragActive
            ? "border-red-600 bg-gray-900 scale-105"
            : "border-gray-600 bg-gray-900"
        }`}
      >
        <p className="text-xl mb-2">Drag & Drop PDF here</p>
        <p className="text-gray-400 mb-4">or</p>

        <label className="bg-red-600 px-6 py-2 rounded-xl cursor-pointer hover:bg-red-700 transition">
          Browse File
          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>

      {/* File List */}
      <div className="mt-10 space-y-6">
        {files.map((file) => (
          <div
            key={file.localId}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">{file.name}</span>
              <StatusBadge status={file.status} />
            </div>

            {file.detail && (
              <p className="text-sm text-gray-400 mb-2">{file.detail}</p>
            )}

            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  file.status === "Failed"
                    ? "bg-red-500"
                    : file.status === "Indexed"
                    ? "bg-green-500"
                    : "bg-red-600"
                }`}
                style={{ width: `${file.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* All Documents Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-black">Uploaded Documents</h2>
        
        {loadingDocuments ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-400">Loading documents...</p>
          </div>
        ) : allDocuments.length === 0 ? (
          <div className="bg-gray-900 p-8 rounded-2xl text-center">
            <p className="text-gray-400">No documents uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allDocuments.map((doc) => (
              <div
                key={doc.doc_id}
                className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {doc.document_name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>Document ID: <span className="text-gray-300">{doc.doc_id}</span></p>
                      <p>
                        Created: 
                        <span className="text-gray-300">
                          {doc.created_at ? new Date(doc.created_at).toLocaleString() : 'N/A'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold">
                      Indexed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const base = "px-3 py-1 rounded-full text-xs font-semibold";

  if (status === "Uploading")
    return <span className={`${base} bg-blue-500`}>Uploading</span>;

  if (status === "Processing")
    return <span className={`${base} bg-yellow-500`}>Processing</span>;

  if (status === "Indexed")
    return <span className={`${base} bg-green-500`}>Indexed</span>;

  if (status === "Failed")
    return <span className={`${base} bg-red-500`}>Failed</span>;

  return null;
};

export default Documents;