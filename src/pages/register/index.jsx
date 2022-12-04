import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import {
  Container,
  Title,
  Column,
  TitleRegister,
  SubtitleRegister,
  NewSubtitleRegister,
  NormalText,
  CriarText,
  Row,
  Wrapper,
  FormRegister,
} from './styles';

const Register = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate('/login');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const onSubmit = async (formData) => {
    const autoId = Math.floor(Math.random() * 1000) + 3;
    try {
      const { data } = await api.post('/users', {
        id: autoId,
        name: formData.name,
        email: formData.email,
        senha: formData.senha,
      });
      console.log(data);
      alert('Cadastro feito com sucesso!');
      handleClickLogin();
    } catch (e) {
      //TODO: HOUVE UM ERRO
    }
  };

  console.log('errors', errors);

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleRegister>Comece Agora Grátis</TitleRegister>
            <SubtitleRegister>
              Crie sua conta e make the change._
            </SubtitleRegister>
            <FormRegister onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder='Nome completo'
                leftIcon={<MdPerson />}
                name='name'
                control={control}
              />
              {errors.nome && <span>Nome é obrigatório</span>}
              <Input
                placeholder='E-mail'
                leftIcon={<MdEmail />}
                name='email'
                control={control}
              />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input
                type='password'
                placeholder='Senha'
                leftIcon={<MdLock />}
                name='senha'
                control={control}
              />
              {errors.senha && <span>Senha é obrigatório</span>}
              <Button
                width='300px'
                title='Criar minha conta'
                variant='secondary'
                type='submit'
              />
            </FormRegister>
          </Wrapper>
          <NewSubtitleRegister>
            Ao clicar em "criar minha conta grátis", declaro que aceito as
            Políticas de Privacidade e os Termos de Uso da DIO.
          </NewSubtitleRegister>
          <Row>
            <NormalText>
              Já tenho conta.
              <CriarText>
                <a href='/login'> Fazer login</a>
              </CriarText>{' '}
            </NormalText>
          </Row>
        </Column>
      </Container>
    </>
  );
};

export { Register };