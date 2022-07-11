<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220711155643 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etablishment DROP FOREIGN KEY FK_5FB71052783E3463');
        $this->addSql('ALTER TABLE etablishment ADD CONSTRAINT FK_5FB71052783E3463 FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etablishment DROP FOREIGN KEY FK_5FB71052783E3463');
        $this->addSql('ALTER TABLE etablishment ADD CONSTRAINT FK_5FB71052783E3463 FOREIGN KEY (manager_id) REFERENCES manager (id) ON DELETE SET NULL');
    }
}
