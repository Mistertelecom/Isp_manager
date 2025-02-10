import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  InputAdornment,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import RouterIcon from '@mui/icons-material/Router';

interface FormValues {
  name: string;
  cpfCnpj: string;
  type: 'PHYSICAL' | 'LEGAL';
  email: string;
  phone: string;
  mobilePhone: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  planId: string;
  installationFee: number;
  dueDay: number;
}

const initialValues: FormValues = {
  name: '',
  cpfCnpj: '',
  type: 'PHYSICAL',
  email: '',
  phone: '',
  mobilePhone: '',
  address: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  zipCode: '',
  planId: '',
  installationFee: 0,
  dueDay: 5,
};

const validationSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  cpfCnpj: yup.string().required('CPF/CNPJ é obrigatório'),
  type: yup.string().oneOf(['PHYSICAL', 'LEGAL']).required('Tipo de cliente é obrigatório'),
  email: yup.string().email('Email inválido'),
  phone: yup.string().required('Telefone é obrigatório'),
  mobilePhone: yup.string(),
  address: yup.string().required('Endereço é obrigatório'),
  number: yup.string().required('Número é obrigatório'),
  complement: yup.string(),
  neighborhood: yup.string().required('Bairro é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  state: yup.string().required('Estado é obrigatório'),
  zipCode: yup.string().required('CEP é obrigatório'),
  planId: yup.string().required('Plano é obrigatório'),
  installationFee: yup.number().min(0, 'Valor não pode ser negativo'),
  dueDay: yup.number().min(1).max(31).required('Dia de vencimento é obrigatório'),
});

interface CustomerFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: FormValues;
}

const steps = [
  'Dados Pessoais',
  'Contato',
  'Endereço',
  'Plano e Serviços',
];

const CustomerForm = ({ open, onClose, initialData }: CustomerFormProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik<FormValues>({
    initialValues: initialData || initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      onClose();
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Informações Pessoais
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Nome Completo"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && (formik.errors.name as string)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="cpfCnpj"
                label="CPF/CNPJ"
                value={formik.values.cpfCnpj}
                onChange={formik.handleChange}
                error={formik.touched.cpfCnpj && Boolean(formik.errors.cpfCnpj)}
                helperText={formik.touched.cpfCnpj && (formik.errors.cpfCnpj as string)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                name="type"
                label="Tipo de Cliente"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && (formik.errors.type as string)}
              >
                <MenuItem value="PHYSICAL">Pessoa Física</MenuItem>
                <MenuItem value="LEGAL">Pessoa Jurídica</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Informações de Contato
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && (formik.errors.email as string)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="phone"
                label="Telefone Fixo"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && (formik.errors.phone as string)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="mobilePhone"
                label="Celular"
                value={formik.values.mobilePhone}
                onChange={formik.handleChange}
                error={formik.touched.mobilePhone && Boolean(formik.errors.mobilePhone)}
                helperText={formik.touched.mobilePhone && (formik.errors.mobilePhone as string)}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Endereço
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="zipCode"
                label="CEP"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && (formik.errors.zipCode as string)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                name="address"
                label="Endereço"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && (formik.errors.address as string)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                name="number"
                label="Número"
                value={formik.values.number}
                onChange={formik.handleChange}
                error={formik.touched.number && Boolean(formik.errors.number)}
                helperText={formik.touched.number && (formik.errors.number as string)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="complement"
                label="Complemento"
                value={formik.values.complement}
                onChange={formik.handleChange}
                error={formik.touched.complement && Boolean(formik.errors.complement)}
                helperText={formik.touched.complement && (formik.errors.complement as string)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="neighborhood"
                label="Bairro"
                value={formik.values.neighborhood}
                onChange={formik.handleChange}
                error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
                helperText={formik.touched.neighborhood && (formik.errors.neighborhood as string)}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                name="city"
                label="Cidade"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && (formik.errors.city as string)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="state"
                label="Estado"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && (formik.errors.state as string)}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Plano e Serviços
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                name="planId"
                label="Plano"
                value={formik.values.planId}
                onChange={formik.handleChange}
                error={formik.touched.planId && Boolean(formik.errors.planId)}
                helperText={formik.touched.planId && (formik.errors.planId as string)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RouterIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="1">Fibra 300MB - R$ 99,90</MenuItem>
                <MenuItem value="2">Fibra 500MB - R$ 129,90</MenuItem>
                <MenuItem value="3">Fibra 1GB - R$ 199,90</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="installationFee"
                label="Taxa de Instalação"
                type="number"
                value={formik.values.installationFee}
                onChange={formik.handleChange}
                error={formik.touched.installationFee && Boolean(formik.errors.installationFee)}
                helperText={formik.touched.installationFee && (formik.errors.installationFee as string)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="dueDay"
                label="Dia de Vencimento"
                type="number"
                value={formik.values.dueDay}
                onChange={formik.handleChange}
                error={formik.touched.dueDay && Boolean(formik.errors.dueDay)}
                helperText={formik.touched.dueDay && (formik.errors.dueDay as string)}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {initialData ? 'Editar Cliente' : 'Novo Cliente'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 4 }}>
            {getStepContent(activeStep)}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Voltar
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={() => formik.handleSubmit()}
          >
            Finalizar
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
          >
            Próximo
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomerForm;
