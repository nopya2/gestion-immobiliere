<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220713151920 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE faculty_diploma (faculty_id INT NOT NULL, diploma_id INT NOT NULL, INDEX IDX_AD325F0D680CAB68 (faculty_id), INDEX IDX_AD325F0DA99ACEB5 (diploma_id), PRIMARY KEY(faculty_id, diploma_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE faculty_diploma ADD CONSTRAINT FK_AD325F0D680CAB68 FOREIGN KEY (faculty_id) REFERENCES faculty (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE faculty_diploma ADD CONSTRAINT FK_AD325F0DA99ACEB5 FOREIGN KEY (diploma_id) REFERENCES diploma (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE faculty_diploma');
    }
}
