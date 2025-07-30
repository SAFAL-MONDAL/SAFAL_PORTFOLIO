import { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type FormSubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<FormSubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      // Client-side validation
      if (!formData.name.trim()) throw new Error('Name is required');
      if (!formData.email.trim()) throw new Error('Email is required');
      if (!formData.message.trim()) throw new Error('Message is required');
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
        throw new Error('Please enter a valid email');
      }
      if (formData.message.trim().length < 10) {
        throw new Error('Message should be at least 10 characters');
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/contact`,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        throw new Error(response.data?.message || 'Message submission failed');
      }
    } catch (error: unknown) {
      let errorMsg = 'Failed to send message. Please try again later.';
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          errorMsg = 'Request timeout. Please check your connection.';
        } else if (error.response) {
          errorMsg = error.response.data?.error || 
                    error.response.data?.message || 
                    `Server error: ${error.response.status}`;
        } else if (error.request) {
          errorMsg = 'Network error. Please check your connection.';
        }
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      console.error('Submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(errorMsg);
    }
  };

  const isSubmitting = submitStatus === 'submitting';
  const showSuccess = submitStatus === 'success';
  const showError = submitStatus === 'error';

  return (
    <ContactSection id="contact">
      <Container>
        <ContactCard>
          <Header>
            <Subtitle>Don't be shy</Subtitle>
            <Title>Drop Me a Line</Title>
          </Header>
          
          <ContentWrapper>
            <Form onSubmit={handleFormSubmit}>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleInputChange}
                disabled={isSubmitting}
                aria-label="Your name"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                aria-label="Your email"
              />
              <TextArea
                name="message"
                placeholder="Message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                disabled={isSubmitting}
                aria-label="Your message"
              />
              <SubmitButton 
                type="submit" 
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit Message'}
              </SubmitButton>
              
              {showSuccess && (
                <SuccessMessage role="alert">
                  Message sent successfully!
                </SuccessMessage>
              )}
              
              {showError && (
                <ErrorMessage role="alert">
                  {errorMessage}
                </ErrorMessage>
              )}
            </Form>
            
            <ContactDetails>
              <DetailItem>
                <Icon><FaMapMarkerAlt /></Icon>
                <DetailContent>
                  <DetailTitle>Address</DetailTitle>
                  <DetailText>Durgapur, West Bengal</DetailText>
                </DetailContent>
              </DetailItem>
              
              <DetailItem>
                <Icon><FaEnvelope /></Icon>
                <DetailContent>
                  <DetailTitle>Email</DetailTitle>
                  <DetailLink href="mailto:safalmondal0123@gmail.com">
                    safalmondal0123@gmail.com
                  </DetailLink>
                </DetailContent>
              </DetailItem>
              
              <DetailItem>
                <Icon><FaPhoneAlt /></Icon>
                <DetailContent>
                  <DetailTitle>Phone</DetailTitle>
                  <DetailLink href="tel:+919749294592">
                    +91 9749294592
                  </DetailLink>
                </DetailContent>
              </DetailItem>
            </ContactDetails>
          </ContentWrapper>
        </ContactCard>
      </Container>
    </ContactSection>
  );
};


// Styled Components
const ContactSection = styled.section`
  padding: 6.25rem 0;
  background: ${({ theme }) => theme.body};

  @media (max-width: 767px) {
    padding: 3.75rem 0;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
  max-width: 1200px;
`;

const ContactCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 1.25rem;
  padding: 3.75rem;
  box-shadow: 0 1.25rem 2.5rem rgba(0, 0, 0, 0.1);
  
  @media (max-width: 767px) {
    padding: 1.875rem;
  }
`;

const Header = styled.div`
  margin-bottom: 3.125rem;
  
  @media (max-width: 767px) {
    margin-bottom: 1.875rem;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.125rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  margin: 0;
  
  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.125rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 767px) {
    gap: 1.875rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Input = styled.input`
  padding: 0.9375rem 1.25rem;
  border-radius: 0.625rem;
  border: none;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  
  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 767px) {
    padding: 0.75rem 0.9375rem;
  }
`;

const TextArea = styled.textarea`
  padding: 0.9375rem 1.25rem;
  border-radius: 0.625rem;
  border: none;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  resize: vertical;
  
  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 767px) {
    padding: 0.75rem 0.9375rem;
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.9375rem;
  border-radius: 0.625rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  &:hover:not(:disabled) {
    transform: translateY(-0.1875rem);
    box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 767px) {
    padding: 0.75rem;
  }
`;

const SuccessMessage = styled.p`
  color: #4BB543;
  margin-top: 0.625rem;
  text-align: center;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  color: #FF3333;
  margin-top: 0.625rem;
  text-align: center;
  font-weight: 600;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;

  @media (max-width: 767px) {
    gap: 1.25rem;
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;

  @media (max-width: 767px) {
    gap: 0.9375rem;
  }
`;

const Icon = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;

  @media (max-width: 767px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`;

const DetailContent = styled.div`
  flex: 1;
`;

const DetailTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  margin: 0 0 0.3125rem 0;
`;

const DetailText = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin: 0;
`;

const DetailLink = styled.a`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    opacity: 1;
  }
`;

export default Contact;