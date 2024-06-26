export interface SurveyResponse {
    _id: string;
    clerkId: string;
    responses: {
      "1": string; // Hours of social media usage
      "2": string; // Social media platform
      "3": string[]; // Reasons for using social media
      "4": string; // Frequency of checking social media
      "5": string; // Impact of social media on study
      "6": string; // Perception of social media impact
      "7": string; // General sentiment towards social media use during study
      "8": string; // Use of social media for educational purposes
      "9": string; // Use of social media-blocking apps
      "10": string; // GPA
    }[];
  }
  
 export interface CrossTabulationResult {
    [socialMediaUsage: string]: {
      [gpaRange: string]: number;
    };
  }
  
  export function createCrossTabulation(data: SurveyResponse[]): CrossTabulationResult {
    const crossTabulation: CrossTabulationResult = {};
  
    data.forEach((response) => {
      const socialMediaUsage = response.responses[0]["1"];
      const gpa = response.responses[0]["10"];
  
      if (!crossTabulation[socialMediaUsage]) {
        crossTabulation[socialMediaUsage] = {};
      }
  
      if (!crossTabulation[socialMediaUsage][gpa]) {
        crossTabulation[socialMediaUsage][gpa] = 0;
      }
  
      crossTabulation[socialMediaUsage][gpa]++;
    });
  
    return crossTabulation;
  }
  