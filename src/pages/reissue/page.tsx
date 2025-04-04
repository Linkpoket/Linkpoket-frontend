// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function ReissuePage() {
//   const router = useRouter();

//   useEffect(() => {
//     const fetchAccessToken = async () => {
//       try {
//         // Request the access token using the refresh token stored in cookies
//         const response = await axios.get(
//           "http://localhost:8080/api/jwt/access-token",
//           { withCredentials: true }
//         );
//         const accessToken = response.data.access_token;

//         localStorage.setItem("access_token", accessToken);
//         console.log(response);
//         router.replace("/personal");
//       } catch (error) {
//         console.error("Error fetching access token:", error);

//         // window.location.href = "http://localhost:8080/login";
//       }
//     };

//     fetchAccessToken();
//   }, [router]);

//   return <p>Reissuing access token... Please wait.</p>;
// }
