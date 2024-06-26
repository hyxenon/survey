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
  
  export function calculateCorrelation(data: SurveyResponse[]): number {
    const socialMediaUsage: number[] = [];
    const gpa: number[] = [];
  
    data.forEach(response => {
      const usage = response.responses[0]["1"];
      const gpaValue = response.responses[0]["10"];
  
      // Convert social media usage to numerical values
      let usageHours: number;
      switch (usage) {
        case "Less than 1 hour":
          usageHours = 0.5;
          break;
        case "1-2 hours":
          usageHours = 1.5;
          break;
        case "3-4 hours":
          usageHours = 3.5;
          break;
        case "4-5 hours":
          usageHours = 4.5;
          break;
        case "More than 5 hours":
          usageHours = 6; // An arbitrary number greater than 5
          break;
        default:
          usageHours = 0;
      }
  
      // Convert GPA to numerical values
      let gpaNum: number;
      switch (gpaValue) {
        case "1.25 or 96-97":
        case "1.50 or 93-95":
        case "1.75 or 90-92":
        case "2.00 or 87-89":
        case "2.25 or 84-86":
        case "2.50 or 81-83":
        case "2.75 or 78-80":
          gpaNum = parseFloat(gpaValue.split(" ")[0]);
          break;
        default:
          gpaNum = 0;
      }
  
      socialMediaUsage.push(usageHours);
      gpa.push(gpaNum);
    });
  
    // Calculate Pearson correlation coefficient
    const mean = (arr: number[]) => arr.reduce((acc, val) => acc + val, 0) / arr.length;
    const meanUsage = mean(socialMediaUsage);
    const meanGpa = mean(gpa);
  
    const numerator = socialMediaUsage.reduce((acc, usage, idx) => {
      return acc + ((usage - meanUsage) * (gpa[idx] - meanGpa));
    }, 0);
  
    const denominator = Math.sqrt(
      socialMediaUsage.reduce((acc, usage) => acc + Math.pow((usage - meanUsage), 2), 0) *
      gpa.reduce((acc, g) => acc + Math.pow((g - meanGpa), 2), 0)
    );
  
    return numerator / denominator;
  }
  