const API_URL = 'http://localhost:8080/api';

export const submitFeedback = async (feedbackData) => {
  try {
    console.log('Submitting feedback data:', feedbackData);
    
    const response = await fetch(`${API_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error('Failed to submit feedback');
    }

    const result = await response.json(); 
    console.log('Success response:', result);
    return result;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

export const getFeedback = async () => {
  try {
    const response = await fetch(`${API_URL}/feedback/list`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch feedback');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
}; 