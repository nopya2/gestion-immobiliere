<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220611235951 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etablishment CHANGE logo_id logo_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE etablishment ADD CONSTRAINT FK_5FB71052F98F144A FOREIGN KEY (logo_id) REFERENCES image (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5FB71052F98F144A ON etablishment (logo_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etablishment DROP FOREIGN KEY FK_5FB71052F98F144A');
        $this->addSql('DROP INDEX UNIQ_5FB71052F98F144A ON etablishment');
        $this->addSql('ALTER TABLE etablishment CHANGE logo_id logo_id INT NOT NULL');
    }
}
