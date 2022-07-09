<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220612000443 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etablishment DROP FOREIGN KEY FK_5FB71052F98F144A');
        $this->addSql('ALTER TABLE etablishment ADD CONSTRAINT FK_5FB71052F98F144A FOREIGN KEY (logo_id) REFERENCES image (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etablishment DROP FOREIGN KEY FK_5FB71052F98F144A');
        $this->addSql('ALTER TABLE etablishment ADD CONSTRAINT FK_5FB71052F98F144A FOREIGN KEY (logo_id) REFERENCES image (id)');
    }
}
