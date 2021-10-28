import {render, screen, cleanup, fireEvent, getByText} from '@testing-library/react';
import {ContactModal} from './';

afterEach(cleanup);

test('Initializes empty form', () => {
  render(<ContactModal />);

  const nameInput = screen.queryByPlaceholderText('Name');
  const phoneInput = screen.queryByPlaceholderText('Phone Number');
  const emailInput = screen.queryByPlaceholderText('Email Address');
  const submitButton = screen.getByText('Submit');

  expect(nameInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();

  expect(nameInput).toHaveValue('');
  expect(phoneInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
  expect(submitButton).toBeDisabled();
});

test('Disable submit button until form is valid', () => {
  render(<ContactModal />);

  const nameInput = screen.queryByPlaceholderText('Name');
  const phoneInput = screen.queryByPlaceholderText('Phone Number');
  const emailInput = screen.queryByPlaceholderText('Email Address');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(nameInput, {target: {value: 'James'}});
  fireEvent.change(phoneInput, {target: {value: '222-343-3323'}});
  fireEvent.change(emailInput, {target: {value: 'james.anderson@gmail.com'}});

  expect(nameInput).toHaveValue('James');
  expect(submitButton).not.toBeDisabled();
});

test('Disable submit button when fields are invalid', () => {
  render(<ContactModal />);

  const nameInput = screen.queryByPlaceholderText('Name');
  const phoneInput = screen.queryByPlaceholderText('Phone Number');
  const emailInput = screen.queryByPlaceholderText('Email Address');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(nameInput, {target: {value: 'James'}});
  fireEvent.change(phoneInput, {target: {value: '222-343-3323'}});
  fireEvent.change(emailInput, {target: {value: 'james.andreson.com'}});

  expect(nameInput).toHaveValue('James');
  expect(submitButton).toBeDisabled();
});

test('Displays error messages for invalid inputs', () => {
  render(<ContactModal />);

  const nameInput = screen.queryByPlaceholderText('Name');
  const phoneInput = screen.queryByPlaceholderText('Phone Number');
  const emailInput = screen.queryByPlaceholderText('Email Address');

  fireEvent.change(nameInput, {target: {value: 'James'}});
  fireEvent.change(phoneInput, {target: {value: '2223433323'}});
  fireEvent.change(emailInput, {target: {value: 'james.anderson@gmail.com'}});

  let errorDiv = screen.getByTestId('error');
  expect(errorDiv).toHaveTextContent('Phone is improperly formatted');

  fireEvent.change(phoneInput, {target: {value: '222-343-3323'}});
  fireEvent.change(emailInput, {target: {value: 'james.anderson.com'}});

  errorDiv = screen.getByTestId('error');
  expect(errorDiv).toHaveTextContent('Email is not valid');

  fireEvent.change(emailInput, {target: {value: 'james.anderson@gmail.com'}});

  errorDiv = screen.queryByTestId('error');
  expect(errorDiv).not.toBeInTheDocument();
});

test('Prevents submit function from being called if invalid', () => {
  const onSubmit = jest.fn();
  render(<ContactModal submit={onSubmit} />);

  const nameInput = screen.getByPlaceholderText('Name');
  const phoneInput = screen.getByPlaceholderText('Phone Number');
  const emailInput = screen.getByPlaceholderText('Email Address');
  const submitButton = screen.getByText('Submit');
  const form = screen.getByTestId('contact-modal-form');

  fireEvent.change(nameInput, {target: {value: 'James'}});
  fireEvent.change(phoneInput, {target: {value: '222-343-3323'}});
  fireEvent.change(emailInput, {target: {value: 'james.andersonmail.com'}});

  expect(submitButton).toBeDisabled();

  fireEvent.submit(form);
  expect(onSubmit).not.toHaveBeenCalled();

  fireEvent.change(emailInput, {target: {value: 'james.anderson@gmail.com'}});

  expect(submitButton).not.toBeDisabled();
  fireEvent.submit(form);
  expect(onSubmit).toHaveBeenCalled();
});
