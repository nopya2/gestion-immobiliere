<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220711162516 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etablishment ADD manager_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE etablishment ADD CONSTRAINT FK_5FB71052783E3463 FOREIGN KEY (manager_id) REFERENCES manager (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5FB71052783E3463 ON etablishment (manager_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etablishment DROP FOREIGN KEY FK_5FB71052783E3463');
        $this->addSql('DROP INDEX UNIQ_5FB71052783E3463 ON etablishment');
        $this->addSql('ALTER TABLE etablishment DROP manager_id');
    }
}
