import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPosts } from "../src/redux/postSlice";

const useGetAllPost = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Simulate fetching posts with mock data
        const fetchAllPost = async () => {
            try {
                const mockResponse = {
                    success: true,
                    posts: [
                        { id: 1, title: "Post 1", content: "Content of Post 1" },
                        { id: 2, title: "Post 2", content: "Content of Post 2" },
                        { id: 3, title: "Post 3", content: "Content of Post 3" },
                    ],
                };

                if (mockResponse.success) {
                    console.log(mockResponse);
                    dispatch(setPosts(mockResponse.posts)); // Dispatch mock posts to Redux store
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchAllPost();
    }, [dispatch]); // Add `dispatch` as a dependency
};

export default useGetAllPost;
