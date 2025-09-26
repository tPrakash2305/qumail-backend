import { uploadKeyToGitHub } from "./utils/gitHubUploader.js";

const sampleKey = "TEST_KEY_1234567890";  // <- this should be your actual generated key
uploadKeyToGitHub(sampleKey);
