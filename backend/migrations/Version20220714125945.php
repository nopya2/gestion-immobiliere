<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220714125945 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE level_type (id INT AUTO_INCREMENT NOT NULL, etablishment_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, code VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_E5FBAC385E237E06 (name), UNIQUE INDEX UNIQ_E5FBAC3877153098 (code), INDEX IDX_E5FBAC3816BE0BCF (etablishment_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE level_type ADD CONSTRAINT FK_E5FBAC3816BE0BCF FOREIGN KEY (etablishment_id) REFERENCES etablishment (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE level_type');
    }
}
