-- Adicionar mais conteúdos iniciais para todas as seções do site
INSERT INTO public.site_content (content_key, content_type, section, label, value, default_value) VALUES
-- About Section
('about_title', 'text', 'About', 'Título da Seção Sobre', 'Quem Somos', 'Quem Somos'),
('about_subtitle', 'text', 'About', 'Subtítulo História', 'Nossa História e Missão', 'Nossa História e Missão'),
('about_intro', 'rich_text', 'About', 'Introdução Sobre', 'Desde 2016, a A+ Engenharia e Segurança Ocupacional oferece soluções técnicas especializadas em sistemas de proteção contra quedas em altura, atendendo diversos setores com inovação e qualidade.', 'Desde 2016, a A+ Engenharia e Segurança Ocupacional oferece soluções técnicas especializadas em sistemas de proteção contra quedas em altura, atendendo diversos setores com inovação e qualidade.'),
('about_history', 'rich_text', 'About', 'História Completa', 'A história da A+ Engenharia teve início em 2016, com o propósito de atender à crescente demanda do setor da construção civil por soluções técnicas voltadas ao dimensionamento de Linhas de Vida e demais sistemas de proteção contra quedas em altura.', 'A história da A+ Engenharia teve início em 2016, com o propósito de atender à crescente demanda do setor da construção civil por soluções técnicas voltadas ao dimensionamento de Linhas de Vida e demais sistemas de proteção contra quedas em altura.'),
('about_evolution', 'rich_text', 'About', 'Evolução da Empresa', 'Evoluímos e expandimos nosso conhecimento técnico, permitindo atuar em outros segmentos como mineração, transporte, varejo e condomínios residenciais. Hoje, contamos com um portfólio diversificado e constantemente atualizado.', 'Evoluímos e expandimos nosso conhecimento técnico, permitindo atuar em outros segmentos como mineração, transporte, varejo e condomínios residenciais. Hoje, contamos com um portfólio diversificado e constantemente atualizado.'),
('about_mission', 'rich_text', 'About', 'Missão', 'Proteger vidas por meio de soluções técnicas inteligentes e eficazes em engenharia de segurança, promovendo ambientes de trabalho mais seguros, eficientes e alinhados às normas vigentes.', 'Proteger vidas por meio de soluções técnicas inteligentes e eficazes em engenharia de segurança, promovendo ambientes de trabalho mais seguros, eficientes e alinhados às normas vigentes.'),
('about_image', 'image', 'About', 'Imagem Principal Sobre', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'),

-- Header Section
('header_logo', 'image', 'Header', 'Logo do Header', '/logo-a1.png', '/logo-a1.png'),
('header_cta_primary', 'text', 'Header', 'CTA Primário', 'Solicite um Orçamento', 'Solicite um Orçamento'),
('header_cta_secondary', 'text', 'Header', 'CTA Secundário Mobile', 'Fale Conosco', 'Fale Conosco'),

-- Footer Section
('footer_company_name', 'text', 'Footer', 'Nome da Empresa', 'A+ ENGENHARIA', 'A+ ENGENHARIA'),
('footer_company_tagline', 'text', 'Footer', 'Tagline', 'Segurança Ocupacional', 'Segurança Ocupacional'),
('footer_description', 'text', 'Footer', 'Descrição', 'Soluções completas em engenharia e segurança do trabalho para empresas de médio e grande porte.', 'Soluções completas em engenharia e segurança do trabalho para empresas de médio e grande porte.'),
('footer_phone', 'text', 'Footer', 'Telefone', '(31) 99959-1842', '(31) 99959-1842'),
('footer_email', 'text', 'Footer', 'E-mail', 'contato@a+engenharia.com.br', 'contato@a+engenharia.com.br'),
('footer_address', 'text', 'Footer', 'Endereço', 'Belo Horizonte - MG\nAtendimento em todo o Brasil', 'Belo Horizonte - MG\nAtendimento em todo o Brasil'),
('footer_copyright', 'text', 'Footer', 'Copyright', '© 2025 A+ Engenharia & Segurança Ocupacional. Todos os direitos reservados.', '© 2025 A+ Engenharia & Segurança Ocupacional. Todos os direitos reservados.'),
('footer_engineer', 'text', 'Footer', 'Nome do Engenheiro', 'Andreson Marques – Eng. Mecânico e Eng. Segurança do Trabalho', 'Andreson Marques – Eng. Mecânico e Eng. Segurança do Trabalho'),
('footer_emergency_title', 'text', 'Footer', 'Título Emergência', 'Atendimento especializado', 'Atendimento especializado'),

-- Contact Section
('contact_title', 'text', 'Contact', 'Título da Seção', 'Entre em Contato', 'Entre em Contato'),
('contact_subtitle', 'text', 'Contact', 'Subtítulo', 'Estamos prontos para desenvolver soluções personalizadas para sua empresa. Entre em contato e converse com nossos especialistas.', 'Estamos prontos para desenvolver soluções personalizadas para sua empresa. Entre em contato e converse com nossos especialistas.'),
('contact_form_title', 'text', 'Contact', 'Título do Formulário', 'Solicite um Orçamento', 'Solicite um Orçamento'),
('contact_emergency_title', 'text', 'Contact', 'Título Emergência', 'Atendimento de Emergência', 'Atendimento de Emergência'),
('contact_emergency_subtitle', 'text', 'Contact', 'Subtítulo Emergência', 'Disponível 24h para casos urgentes', 'Disponível 24h para casos urgentes'),
('contact_info_title', 'text', 'Contact', 'Título Info de Contato', 'Informações de Contato', 'Informações de Contato'),
('contact_quick_actions_title', 'text', 'Contact', 'Título Ações Rápidas', 'Ações Rápidas', 'Ações Rápidas'),

-- Specializations Section
('specializations_title', 'text', 'Specializations', 'Título da Seção', 'Áreas de Especialização', 'Áreas de Especialização'),
('specializations_consulting_title', 'text', 'Specializations', 'Título Consultoria', 'Consultoria em Segurança do Trabalho', 'Consultoria em Segurança do Trabalho'),
('specializations_protection_title', 'text', 'Specializations', 'Título Proteção', 'Projetos de Proteção e Adequação', 'Projetos de Proteção e Adequação'),
('specializations_engineering_title', 'text', 'Specializations', 'Título Engenharia', 'Engenharia Estrutural e Mecânica', 'Engenharia Estrutural e Mecânica'),
('specializations_image_consulting', 'image', 'Specializations', 'Imagem Consultoria', 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'),
('specializations_image_protection', 'image', 'Specializations', 'Imagem Proteção', 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'),

-- Clients Section
('clients_title', 'text', 'Clients', 'Título da Seção', 'Empresas que Confiam em Nós', 'Empresas que Confiam em Nós'),
('clients_subtitle', 'text', 'Clients', 'Subtítulo', 'Orgulhamos-nos de trabalhar com empresas líderes em diversos setores industriais', 'Orgulhamos-nos de trabalhar com empresas líderes em diversos setores industriais')

ON CONFLICT (content_key) DO NOTHING;