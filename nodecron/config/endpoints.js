module.exports = [
  {
    name: "Archived Sessions Download",
    method: "GET",
    path: "/archieve/file"
  },
  {
    name: "Session Cleanup",
    method: "POST",
    path: "/cleanup/clean"
  },
  {
    name: "Stale Users Cleanup",
    method: "POST",
    path: "/stale/clean"
  },
  {
    name: "Daily Summary Report",
    method: "GET",
    path: "/report/report"
  }
];


