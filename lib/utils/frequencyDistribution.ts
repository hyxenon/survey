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
  
  export function calculateFrequencyDistribution(data: SurveyResponse[]) {
    const platformCounts: { [key: string]: number } = {};
  
    data.forEach(response => {
      const platform = response.responses[0]["2"];
      if (platform in platformCounts) {
        platformCounts[platform]++;
      } else {
        platformCounts[platform] = 1;
      }
    });
  
    return Object.entries(platformCounts).map(([platform, count]) => ({
      platform,
      count,
    }));
  }
  