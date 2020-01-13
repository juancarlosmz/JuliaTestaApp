
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `Apellido` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `contra` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `rol` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


CREATE TABLE `product` (
  `id` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `title` Text COLLATE utf8_spanish2_ci,
  `body_html` Text COLLATE utf8_spanish2_ci,
  `vendor` Text COLLATE utf8_spanish2_ci,
  `product_type` Text COLLATE utf8_spanish2_ci,
  `created_at` varchar(100) COLLATE utf8_spanish2_ci,
  `handle` Text COLLATE utf8_spanish2_ci,
  `updated_at` varchar(100) COLLATE utf8_spanish2_ci,
  `published_at` varchar(100) COLLATE utf8_spanish2_ci,
  `template_suffix` varchar(100) COLLATE utf8_spanish2_ci,
  `published_scope` Text COLLATE utf8_spanish2_ci,
  `tags` Text COLLATE utf8_spanish2_ci,
  `admin_graphql_api_id` Text COLLATE utf8_spanish2_ci,
  `variants` Text COLLATE utf8_spanish2_ci,
  `options` Text COLLATE utf8_spanish2_ci,
  `images` Text COLLATE utf8_spanish2_ci,
  `image` Text COLLATE utf8_spanish2_ci,
  `Selected` varchar(100) COLLATE utf8_spanish2_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;




ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

INSERT INTO `user` (`id`, `Nombre`, `Apellido`, `email`, `contra`, `rol`) VALUES
(1, 'admin', 'admin', 'admin@gmail.com', '123456', 1);


